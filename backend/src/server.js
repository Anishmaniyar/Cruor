import dotenv from "dotenv";
import app from "./app.js";
import prisma from "./db.js";
import redisClient from "./config/redis.js";

import "./modules/notifications/notification.worker.js";
import "./modules/notifications/jobs/scheduler.js";
import "./modules/notifications/scheduler.worker.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log("Connecting to Neon PostgreSQL database...");
    await prisma.$connect();
    console.log("Successfully connected to Neon DB via Prisma Client.");

    const server = app.listen(PORT, () => {
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

        await redisClient.quit();
        console.log("Redis connection closed.");

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

// Import the queue at the top of server.js to send a test job
import { notificationQueue } from "./modules/notifications/notification.queue.js";

// ... inside your startServer() function:
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server smoothly running on port ${PORT} in development mode`);

  // 🔥 TEMPORARY TEST: Add a dummy job to the queue to verify Phase 5
  try {
    console.log("🧪 Sending a test job to BullMQ...");
    await notificationQueue.add("testNotificationJob", {
      message: "Hello from Phase 5 verification!",
      userId: "12345",
      title: "Test Notification",
    });
  } catch (err) {
    console.error("❌ Failed to add test job:", err);
  }
});
