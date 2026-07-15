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
  console.log("📅 Inventory Expiry Job registered.");

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

  console.log("📅 Scheduler Job registered successfully.");
};

registerSchedulerJobs().catch((err) => {
  console.error("Failed to register scheduler jobs", err);
});
