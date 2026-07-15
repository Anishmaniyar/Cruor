import { Queue } from "bullmq";
import redisClient from "../../config/redis.js";

const redisConnection = redisClient.options;

export const notificationQueue = new Queue("notificationQueue", {
  connection: redisConnection,
});

console.log("BullMQ Notification Queue initialized");
