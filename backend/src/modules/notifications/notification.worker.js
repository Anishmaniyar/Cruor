import { Worker } from "bullmq";
import { redisConnection } from "../../config/redis.js";

const sendEmail = async (recipient, title, message) => {
  console.log(`📧 Sending email to ${recipient.email ?? "Unknown User"}`);
};

const sendPushNotification = async (recipient, title, message) => {
  console.log(
    `📱 Sending push notification to ${recipient.userId ?? "Unknown User"}`,
  );
};

const sendSMS = async (recipient, message) => {
  console.log(`💬 Sending SMS to ${recipient.phone ?? "Unknown User"}`);
};

const notificationWorker = new Worker(
  "notificationQueue",

  async (job) => {
    switch (job.name) {
      case "sendNotificationJob": {
        const { notification, recipient } = job.data;

        console.log(`📥 Processing Notification ${notification.id}`);

        await Promise.all([
          sendEmail(recipient, notification.title, notification.message),

          sendPushNotification(
            recipient,
            notification.title,
            notification.message,
          ),

          sendSMS(recipient, notification.message),
        ]);

        break;
      }

      default:
        console.log(`Unknown Job: ${job.name}`);
    }
  },

  {
    connection: redisConnection,

    concurrency: 5,
  },
);

notificationWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

notificationWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed`, err.message);
});

console.log("👷 Notification Worker started");

export default notificationWorker;
