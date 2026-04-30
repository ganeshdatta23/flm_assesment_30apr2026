import "dotenv/config";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import { router } from "../../server/router.js";

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to log requests for debugging in Netlify Function Logs
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Use the router for all paths. 
// The netlify.toml redirect will handle the /api prefix.
app.use("/", router);

app.use((error, _request, response, _next) => {
  console.error("Function Error:", error);
  response.status(500).json({
    message: error.message || "Something went wrong while loading records.",
    error: process.env.NODE_ENV === "development" ? error.stack : "Internal Server Error",
  });
});

export const handler = serverless(app);
