// REDIS DISABLED - re-enable when Redis is configured
// import { Queue } from "bullmq";
// import { redisConnection } from "../../config/redis.js";

// REDIS DISABLED - re-enable when Redis is configured
// BullMQ's Queue constructor connects to Redis eagerly, so the queue is
// commented out rather than constructed. Uncomment this block (and the two
// imports above) to restore it.
//
// export const schedulerQueue = new Queue("schedulerQueue", {
//   connection: redisConnection,
// });
//
// console.log("📬 Bull MQ - Scheduler Queue initialized");

// REDIS DISABLED - re-enable when Redis is configured
// No-op stand-in for the BullMQ scheduler queue. jobs/scheduler.js calls
// `upsertJobScheduler` / `updateJobProgress` at import time; with Redis off
// those must not throw, so every method resolves without scheduling anything.
//
// NOTE (pre-existing bug, not caused by disabling Redis): BullMQ exposes no
// `Queue.updateJobProgress` method - progress is updated on a Job instance.
// jobs/scheduler.js calls it twice to register the appointment/eligibility
// reminder schedulers, so with Redis ON those two calls throw a TypeError that
// is swallowed by that file's `.catch()`, meaning only `inventoryExpiryJob` was
// ever registered. Fix those two calls (they look like `upsertJobScheduler`)
// before re-enabling Redis. The method is stubbed below so nothing throws now.
const warnOnce = () => {
  if (warnOnce.warned) return;
  warnOnce.warned = true;
  console.warn(
    "⚠️  REDIS DISABLED: scheduled jobs are NOT registered. " +
      "Cron jobs (inventory expiry, appointment/eligibility reminders) are inactive.",
  );
};

export const schedulerQueue = {
  add: async () => {
    warnOnce();
    return null;
  },
  upsertJobScheduler: async () => {
    warnOnce();
    return null;
  },
  updateJobProgress: async () => {
    warnOnce();
    return null;
  },
};
