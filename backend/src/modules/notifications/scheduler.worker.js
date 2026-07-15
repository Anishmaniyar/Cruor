import { Worker } from "bullmq";
import { redisConnection } from "../../config/redis.js";
import * as InventoryService from "../blood-units/inventory.service.js";
import * as AppointmnetService from "../appointments/appointment.service.js";
import * as EligiblityService from "../eligibility/eligibility.service.js";
import { log } from "console";

const schedulerWorker = new Worker(
  "schedulerQueue",

  async (job) => {
    switch (job.name) {
      case "inventoryExpiryJob": {
        console.log("🩸 Running Inventory Expiry Job...");

        await InventoryService.expireBloodUnitsService();

        console.log("✅ Inventory Expiry Completed");

        break;
      }

      case "appointmentReminderJob": {
        console.log(" Running Appointment Reminder Job... ");

        await AppointmnetService.sendAppointmentReminderService();

        console.log("Appointment Reminder Sent");

        break;
      }

      case "eligiblityReminderJob": {
        console.log(" Running eligiblity Reminder Job");

        await EligiblityService.sendEligibilityReminderService();

        console.log("Eligiblity Reminder Sent");
      }

      /* registerCampaignReminderJob();

registerLowInventoryJob(); implement later */

      default:
        console.log(`Unknown Scheduler Job: ${job.name}`);
    }
  },

  {
    connection: redisConnection,
    concurrency: 2,
  },
);

schedulerWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

schedulerWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed`, err.message);
});

console.log("👷 Schedule Worker started");

export default schedulerWorker;
