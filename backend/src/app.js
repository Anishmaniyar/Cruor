import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/index.js";
import cors from "cors";

const app = express();

// Express generates ETags by default, so repeated GETs return "304 Not Modified".
// For an authenticated JSON API that is actively unhelpful: it clutters the
// deployment logs with 304s (making real failures hard to spot) and lets the
// browser serve a stale appointment/campaign list straight after a mutation.
app.set("etag", false);

/* ────────────────────────────────────────────────────────────────────────────
 * Request logging
 *
 * morgan's built-in "dev" format emits ANSI colour codes. Render's log view is
 * plain text, so those codes show up as raw escape sequences and the lines are
 * hard to read. This custom format is a single line with no colours in
 * production, and colour is only applied when stdout is an interactive
 * terminal (i.e. when running locally).
 *
 * The line is printed on response finish, which means `req.user` / `req.hospital`
 * set by the auth middlewares are already available and can be logged.
 * ──────────────────────────────────────────────────────────────────────────── */

const useColour = process.stdout.isTTY === true;

const colour = (code, text) =>
  useColour ? `\u001b[${code}m${text}\u001b[0m` : text;

morgan.token("actor", (req) => {
  if (req.user?.id) return `user=${req.user.id}`;
  if (req.hospital?.id) return `hospital=${req.hospital.id}`;
  return "actor=anonymous";
});

app.use(
  morgan((tokens, req, res) => {
    const status = Number(tokens.status(req, res)) || 0;

    // 5xx red, 4xx yellow, everything else green (only when colour is enabled).
    const statusColour = status >= 500 ? 31 : status >= 400 ? 33 : 32;

    return [
      new Date().toISOString(),
      tokens.method(req, res),
      tokens.url(req, res),
      colour(statusColour, tokens.status(req, res)),
      `${tokens["response-time"](req, res)}ms`,
      `origin=${req.headers.origin ?? "-"}`,
      tokens.actor(req, res),
    ].join(" ");
  }),
);

/* ────────────────────────────────────────────────────────────────────────────
 * CORS
 *
 * Origins come from the CORS_ORIGINS env var (comma separated) so a new
 * deployment URL does not require a code change. The defaults below keep local
 * development and the current production frontend working.
 *
 * A blocked origin is logged explicitly: `cors` refuses silently by default,
 * which is the single most common cause of "it works locally but the deployed
 * frontend cannot reach the API" — the request appears in the log with an
 * unexplained failure and nothing says the origin was rejected.
 * ──────────────────────────────────────────────────────────────────────────── */

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://vital-drops-2-0.vercel.app",
];

const envOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [
  ...new Set([...DEFAULT_ALLOWED_ORIGINS, ...envOrigins]),
];

console.log(`[cors] Allowed origins: ${allowedOrigins.join(", ")}`);
if (envOrigins.length > 0) {
  console.log(`[cors] Added from CORS_ORIGINS env var: ${envOrigins.join(", ")}`);
}

app.use(
  cors({
    origin(origin, callback) {
      // Requests with no Origin header (curl, Render health checks, server-to-
      // server calls) are not browser cross-origin requests, so allow them.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      console.warn(
        `[cors] BLOCKED origin "${origin}" - this request will fail in the browser. ` +
          `Allowed: ${allowedOrigins.join(", ")}. ` +
          `Add the origin to the CORS_ORIGINS env var (comma separated) if it is your frontend.`,
      );

      // Reject by omitting the headers rather than throwing, so the request
      // still produces a normal logged response instead of a 500.
      return callback(null, false);
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Never let the browser cache API responses.
app.use("/api/v1", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/api/v1", rootRouter);

app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use((err, req, res, next) => {
  console.log(
    `\n========== ERROR ${req.method} ${req.originalUrl} ==========`,
  );
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
