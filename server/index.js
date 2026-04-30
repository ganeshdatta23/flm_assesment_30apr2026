import "dotenv/config";
import cors from "cors";
import express from "express";
import { getCollection } from "./db.js";
import {
  buildRecordMatch,
  getRecordSort,
  normalizeRecord,
  parseRecordQuery,
} from "./records.js";

const app = express();
const port = Number.parseInt(process.env.PORT || "4000", 10);

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_request, response) => {
  const collection = await getCollection();
  const sample = await collection.findOne({}, { projection: { _id: 1 } });

  response.json({
    ok: true,
    connected: Boolean(sample),
  });
});

app.get("/api/records/options", async (_request, response, next) => {
  try {
    const collection = await getCollection();

    const [countries, regions, years, sections, totalCount, topCountries] = await Promise.all([
      collection.distinct("Country"),
      collection.distinct("CDP_Region"),
      collection.distinct("Year_Reported_to_CDP"),
      collection.distinct("Section"),
      collection.countDocuments(),
      collection
        .aggregate([
          { $match: { Country: { $nin: [null, ""] } } },
          { $group: { _id: "$Country", count: { $sum: 1 } } },
          { $sort: { count: -1, _id: 1 } },
          { $limit: 8 },
        ])
        .toArray(),
    ]);

    response.json({
      countries: countries.filter(Boolean).sort(),
      regions: regions.filter(Boolean).sort(),
      years: years.filter(Boolean).sort((left, right) => right - left),
      sections: sections.filter(Boolean).sort(),
      totalCount,
      topCountries: topCountries.map((item) => ({
        country: item._id,
        count: item.count,
      })),
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/records", async (request, response, next) => {
  try {
    const filters = parseRecordQuery(request.query);
    const match = buildRecordMatch(filters);
    const collection = await getCollection();

    const [total, items] = await Promise.all([
      collection.countDocuments(match),
      collection
        .find(match)
        .sort(getRecordSort(filters.sortBy))
        .skip(filters.skip)
        .limit(filters.limit)
        .toArray(),
    ]);

    response.json({
      items: items.map(normalizeRecord),
      total,
      hasMore: filters.skip + items.length < total,
      page: filters.page,
      limit: filters.limit,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  response.status(500).json({
    message: error.message || "Something went wrong while loading records.",
  });
});

app.listen(port, () => {
  console.log(`API listening on ${request.hostname}:${port}`);
});
  