import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

// --- DATABASE LOGIC ---
let clientPromise;

async function getCollection() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  const collName = process.env.MONGODB_COLLECTION;

  if (!uri || !dbName || !collName) {
    throw new Error(`Missing Env Vars: URI:${!!uri}, DB:${!!dbName}, COLL:${!!collName}`);
  }

  if (!clientPromise) {
    // Adding options to handle potential SSL/TLS issues common in serverless environments
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000, // Increase to 10s for initial connection
      connectTimeoutMS: 10000,
      retryWrites: false, // Disable retryable writes to simplify connection
      tls: true, // Explicitly enable TLS
    });
    clientPromise = client.connect();
  }

  const client = await clientPromise;
  return client.db(dbName).collection(collName);
}

// --- RECORD UTILS ---
function normalizeRecord(record) {
  return {
    id: String(record._id),
    organization: record.Organization || "",
    country: record.Country || "",
    region: record.CDP_Region || "",
    yearReported: record.Year_Reported_to_CDP || null,
    accountNumber: record.Account_Number || null,
    parentSection: record.Parent_Section || "",
    section: record.Section || "",
    questionNumber: record.Question_Number || "",
    questionName: record.Question_Name || "",
    columnName: record.Column_Name || "",
    rowName: record.Row_Name || "",
    responseAnswer: record.Response_Answer || "",
    lastUpdate: record.Last_update || "",
  };
}

// --- APP LOGIC ---
const app = express();
app.use(cors());
app.use(express.json());

// Main Data Endpoint
app.get("/api/records", async (req, res, next) => {
  try {
    const { country, region, year, section, search, sortBy, page = 1, limit = 20 } = req.query;
    const collection = await getCollection();
    
    const match = {};
    if (country && country !== "All") match.Country = country;
    if (region && region !== "All") match.CDP_Region = region;
    if (section && section !== "All") match.Section = section;
    if (year && year !== "All") {
      const parsedYear = Number(year);
      if (!isNaN(parsedYear)) match.Year_Reported_to_CDP = parsedYear;
    }
    if (search) match.$text = { $search: search };

    // Sorting logic
    let sort = { Year_Reported_to_CDP: -1, _id: -1 };
    if (sortBy === "organization_asc") sort = { Organization: 1, _id: 1 };
    else if (sortBy === "organization_desc") sort = { Organization: -1, _id: -1 };
    else if (sortBy === "country_asc") sort = { Country: 1, Organization: 1, _id: 1 };
    else if (sortBy === "year_asc") sort = { Year_Reported_to_CDP: 1, _id: 1 };

    const p = parseInt(page);
    const l = parseInt(limit);
    const skip = (p - 1) * l;

    const [total, items] = await Promise.all([
      collection.countDocuments(match),
      collection.find(match).sort(sort).skip(skip).limit(l).toArray()
    ]);

    res.json({
      items: items.map(normalizeRecord),
      total,
      page: p,
      limit: l,
      hasMore: skip + items.length < total
    });
  } catch (err) {
    next(err);
  }
});

// Options Endpoint
app.get("/api/records/options", async (req, res, next) => {
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

    res.json({
      countries: countries.filter(Boolean).sort(),
      regions: regions.filter(Boolean).sort(),
      years: years.filter(Boolean).sort((a, b) => b - a),
      sections: sections.filter(Boolean).sort(),
      totalCount,
      topCountries: topCountries.map((item) => ({
        country: item._id,
        count: item.count,
      })),
    });
  } catch (err) {
    next(err);
  }
});

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  res.status(500).json({
    message: "Database Connection Error",
    details: err.message,
    hint: "Check if your IP is whitelisted (0.0.0.0/0) in MongoDB Atlas Network Access."
  });
});

export const handler = serverless(app);
