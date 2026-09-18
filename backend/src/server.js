import dotenv from "dotenv";
import app from "./app.js";
import prisma from "./db.js";

// REDIS DISABLED - re-enable when Redis is configured
// import redisClient from "./config/redis.js";

// REDIS DISABLED - re-enable when Redis is configured
// The BullMQ workers and the cron scheduler registration all connect to Redis
// on import. They are commented out so the process starts with no Redis
// connection attempts. Re-import them together with the Redis client above.
// import "./modules/notifications/notification.worker.js";
// import "./modules/notifications/jobs/scheduler.js";
// import "./modules/notifications/scheduler.worker.js";

// REDIS DISABLED - re-enable when Redis is configured
// import { notificationQueue } from "./modules/notifications/notification.queue.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log("Connecting to Neon PostgreSQL database...");
    await prisma.$connect();
    console.log("Successfully connected to Neon DB via Prisma Client.");

    const server = app.listen(PORT, async () => {
      console.log(
        `🚀 Server smoothly running on port ${PORT} in development mode`,
      );
    });

    const gracefulShutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Shutting down backend gracefully...`);

      server.close(async () => {
        console.log("HTTP server closed.");

        await prisma.$disconnect();
        console.log("Database connections closed.");

        // REDIS DISABLED - re-enable when Redis is configured
        // await redisClient.quit();
        // console.log("Redis connection closed.");

        process.exit(0);
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("CRITICAL ERROR: Failed to start the backend system:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
