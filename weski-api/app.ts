import express from "express";
import cors from "cors";
import router from "./router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/v1", router);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err);

  if (err.message === "Validation failed") {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
  // Do not call next(err) here, just respond, so the app doesn't crash
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
});

export default app;
