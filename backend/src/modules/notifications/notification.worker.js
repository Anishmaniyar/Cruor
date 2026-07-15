import { Worker } from "bullmq";
import redisClient from "../../config/redis.js";
import { success } from "zod";

const redisConnection = redisClient.options;

const sendEmail = async (recipient, title, message) => {
  console.log(
    `📧 [Email Provider] Sending email to ${recipient.email || "User"}...`,
  );
};

const sendPushNotification = async (recipient, title, message) => {
  console.log(
    `📱 [Push Provider] Sending mobile push to device token of user ${recipient.userId}...`,
  );
};

const sendSMS = async (recipient, message) => {
  console.log(
    `💬 [SMS Provider] Sending text message to ${recipient.phone || "User"}...`,
  );
};

const notificationWorker = new Worker(
  "notificationQueue",

  async (job) => {
    if (job.name === "sendNotificationJob") {
      const { notification, recipient } = job.data;

      console.log(
        `📥 [Worker] Processing Delivery for Notification ID: ${notification.id}`,
      );

      await Promise.all([
        sendEmail(recipient, notification.title, notification.message),
        sendPushNotification(
          recipient,
          notification.title,
          notification.message,
        ),
        sendSMS(recipient, notification.message),
      ]);

      console.log(
        `🏁 [Worker] All delivery channels triggered for Notification: ${notification.id}`,
      );
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
  },
);

notificationWorker.on("completed", (job) => {
  console.log(`✅ [Worker] Job ${job.id} completed successfully!`);
});

notificationWorker.on("failed", (job, err) => {
  console.error(`❌ [Worker] Job ${job?.id} failed with error:`, err.message);
});

console.log("👷 BullMQ Notification Worker is live and listening for jobs...");

export default notificationWorker;
