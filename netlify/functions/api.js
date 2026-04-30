import "dotenv/config";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import { router } from "../../server/router.js";

const app = express();

app.use(cors());
app.use(express.json());

// Support both /api/records and /records (depending on how Netlify passes the path)
app.use("/api", router);
app.use("/", router);

app.use((error, _request, response, _next) => {
  response.status(500).json({
    message: error.message || "Something went wrong while loading records.",
  });
});

export const handler = serverless(app);
