import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", rootRouter);

app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use((err, req, res, next) => {
  console.log("\n========== ERROR ==========");
  console.error(err);
  console.error(err.stack);
  console.log("===========================\n");

  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status: status,
    message: err.message || "Something went wrong internal to the server.",
  });
});

export default app;
