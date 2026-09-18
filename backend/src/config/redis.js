// REDIS DISABLED - re-enable when Redis is configured
// import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// REDIS DISABLED - re-enable when Redis is configured
// This plain config object is intentionally left active: it performs no I/O
// and the BullMQ queue/worker files reference it, so re-enabling Redis is a
// matter of uncommenting their blocks. Nothing connects until a client is
// constructed with it.
export const redisConnection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
};

// REDIS DISABLED - re-enable when Redis is configured
// const redisClient = new Redis(redisConnection);
//
// redisClient.on("connect", () => {
//   console.log("🚀 Redis connected successfully");
// });
//
// redisClient.on("error", (err) => {
//   console.error("❌ Redis connection error:", err);
// });

// REDIS DISABLED - re-enable when Redis is configured
// Exported as null so any leftover usage fails fast and obviously in
// development rather than silently re-opening a Redis connection.
const redisClient = null;

export default redisClient;
