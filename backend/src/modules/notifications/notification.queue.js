// REDIS DISABLED - re-enable when Redis is configured
// import { Queue } from "bullmq";
// import { redisConnection } from "../../config/redis.js";

// REDIS DISABLED - re-enable when Redis is configured
// BullMQ's Queue constructor connects to Redis eagerly, so the queue is
// commented out rather than constructed. Uncomment this block (and the two
// imports above) to restore it.
//
// export const notificationQueue = new Queue("notificationQueue", {
//   connection: redisConnection,
// });
//
// console.log("📬 Bull MQ - Notification Queue initialized");

// REDIS DISABLED - re-enable when Redis is configured
// No-op stand-in for the BullMQ queue. Callers such as
// notification.service.js can keep calling `.add()` without Redis running:
// the job is accepted and dropped instead of throwing. Warns once per process
// so a bulk send does not flood the logs.
let hasWarned = false;

const dropJob = (jobName) => {
  if (!hasWarned) {
    hasWarned = true;
    console.warn(
      `⚠️  REDIS DISABLED: "${jobName}" was accepted but NOT queued. ` +
        "Notification jobs will not be processed until Redis is re-enabled.",
    );
  }
  return null;
};

export const notificationQueue = {
  add: async (jobName) => dropJob(jobName),
};
