import { Queue } from "bullmq";
import { redisConnection } from "../../config/redis.js";

export const notificationQueue = new Queue("notificationQueue", {
  connection: redisConnection,
});

console.log("📬 Bull MQ - Notification Queue initialized");
