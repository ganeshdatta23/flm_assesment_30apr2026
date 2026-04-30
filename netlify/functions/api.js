import "dotenv/config";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import { router } from "../../server/router.js";

const app = express();

app.use(cors());
app.use(express.json());

// 1. Logging Middleware - This will show up in Netlify Function Logs
app.use((req, res, next) => {
  console.log(`[DEBUG] Method: ${req.method}, URL: ${req.url}, OriginalURL: ${req.originalUrl}`);
  next();
});

// 2. Direct test endpoint (no router)
app.get("/api/test-direct", (req, res) => {
  res.json({
    message: "Direct endpoint working",
    url: req.url,
    env_keys: {
      has_uri: !!process.env.MONGODB_URI,
      has_db: !!process.env.MONGODB_DB,
      has_coll: !!process.env.MONGODB_COLLECTION
    }
  });
});

// 3. Mount router with multiple possibilities
app.use("/.netlify/functions/api", router);
app.use("/api", router);
app.use("/", router);

// 4. Custom 404 for debugging
app.use((req, res) => {
  console.log(`[404] No route matched for: ${req.url}`);
  res.status(404).json({
    message: "Route not found in Express",
    path: req.url,
    originalUrl: req.originalUrl
  });
});

// 5. Error Handler
app.use((error, _request, response, _next) => {
  console.error("[ERROR] Function Crash:", error);
  response.status(500).json({
    message: "Internal Server Error in Function",
    error: error.message,
    stack: error.stack
  });
});

export const handler = serverless(app);
