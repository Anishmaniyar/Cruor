import { Queue } from "bullmq";
import { redisConnection } from "../../config/redis.js";

export const schedulerQueue = new Queue("schedulerQueue", {
  connection: redisConnection,
});

console.log("📬 Bull MQ - Scheduler Queue initialized");
