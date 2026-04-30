import "dotenv/config";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import { router } from "../../server/router.js";

const app = express();

app.use(cors());
app.use(express.json());

// This ensures that whether the path is /api/ping, /ping, or /.netlify/functions/api/ping, it works.
app.use("/.netlify/functions/api", router);
app.use("/api", router);
app.use("/", router);

app.use((error, _request, response, _next) => {
  console.error("Function Error:", error);
  response.status(500).json({
    message: error.message || "Something went wrong.",
    error: error.message
  });
});

export const handler = serverless(app);
