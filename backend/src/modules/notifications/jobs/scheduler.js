// REDIS DISABLED - re-enable when Redis is configured
// This module is no longer imported by server.js, so the cron jobs below are
// not registered. It is left intact and its calls are safe: scheduler.queue.js
// exports a no-op stand-in that resolves without touching Redis, so importing
// this file will not throw. Re-add the import in server.js to re-enable.
import { schedulerQueue } from "../scheduler.queue.js";

const registerSchedulerJobs = async () => {
  await schedulerQueue.upsertJobScheduler(
    "inventoryExpiryScheduler",
    {
      pattern: "0 0 * * *",
    },
    {
      name: "inventoryExpiryJob",
      data: {},
      opts: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
      },
    },
  );
  // REDIS DISABLED - re-enable when Redis is configured
  // Log commented out: with Redis off nothing is actually registered, so this
  // message would be misleading. Restore it together with the queue above.
  // console.log("📅 Inventory Expiry Job registered.");

  await schedulerQueue.updateJobProgress(
    "appointmentReminderScheduler",
    {
      pattern: "0 * * * *",
    },
    {
      name: "appointmentReminderJob",
      data: {},
      opts: {
        attempts: 3,
        removeOnComplete: 100,
        removeOnFail: 50,
      },
    },
  );

  await schedulerQueue.updateJobProgress(
    "eligiblityReminderJob",
    {
      pattern: "0 9 * * *",
    },
    {
      name: "eligiblityReminderJob",
      data: {},
      opts: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
      },
    },
  );

  // REDIS DISABLED - re-enable when Redis is configured
  // console.log("📅 Scheduler Job registered successfully.");
};

registerSchedulerJobs().catch((err) => {
  console.error("Failed to register scheduler jobs", err);
});
