import "dotenv/config";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import { router } from "../../server/router.js";

const app = express();

app.use(cors());
app.use(express.json());

// Match the path that Netlify redirects to: /.netlify/functions/api/...
// The :splat in netlify.toml will pass the remaining path here.
app.use("/.netlify/functions/api", router);

// Fallback for different environments or direct calls
app.use("/api", router);

app.use((error, _request, response, _next) => {
  console.error("Function Error:", error);
  response.status(500).json({
    message: error.message || "Something went wrong while loading records.",
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
});

export const handler = serverless(app);
