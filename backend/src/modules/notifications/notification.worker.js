// REDIS DISABLED - re-enable when Redis is configured
// import { Worker } from "bullmq";
// import { redisConnection } from "../../config/redis.js";

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

// REDIS DISABLED - re-enable when Redis is configured
// BullMQ's Worker constructor connects to Redis and starts polling a queue,
// which would retry forever and log connection errors with Redis off. The
// whole worker is commented out and a null export is used instead.
//
// const notificationWorker = new Worker(
//   "notificationQueue",
//
//   async (job) => {
//     switch (job.name) {
//       case "sendNotificationJob": {
//         const { notification, recipient } = job.data;
//
//         console.log(`📥 Processing Notification ${notification.id}`);
//
//         await Promise.all([
//           sendEmail(recipient, notification.title, notification.message),
//
//           sendPushNotification(
//             recipient,
//             notification.title,
//             notification.message,
//           ),
//
//           sendSMS(recipient, notification.message),
//         ]);
//
//         break;
//       }
//
//       default:
//         console.log(`Unknown Job: ${job.name}`);
//     }
//   },
//
//   {
//     connection: redisConnection,
//
//     concurrency: 5,
//   },
// );
//
// notificationWorker.on("completed", (job) => {
//   console.log(`✅ Job ${job.id} completed`);
// });
//
// notificationWorker.on("failed", (job, err) => {
//   console.error(`❌ Job ${job?.id} failed`, err.message);
// });
//
// console.log("👷 Notification Worker started");

// REDIS DISABLED - re-enable when Redis is configured
// Null export keeps `import "./notification.worker.js"` in server.js safe.
const notificationWorker = null;

export default notificationWorker;
