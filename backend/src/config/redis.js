import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redisConnection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
};

const redisClient = new Redis(redisConnection);

redisClient.on("connect", () => {
  console.log("🚀 Redis connected successfully");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redisClient;
