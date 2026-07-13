export const appointmentTemplates = {
  APPOINTMENT_BOOKED: ({ hospitalName, appointmentDate, appointmentTime }) => ({
    title: "Appointment Request Submitted",
    message: `Your appointment request at ${hospitalName} has been submitted for ${appointmentDate} at ${appointmentTime}. You'll receive another notification once the hospital confirms your booking.`,
  }),

  APPOINTMENT_CONFIRMED: ({
    hospitalName,
    appointmentDate,
    appointmentTime,
  }) => ({
    title: "Appointment Confirmed",
    message: `Your appointment at ${hospitalName} has been confirmed for ${appointmentDate} at ${appointmentTime}. Please arrive 10–15 minutes early with a valid ID.`,
  }),

  APPOINTMENT_CANCELLED: ({ hospitalName, appointmentDate }) => ({
    title: "Appointment Cancelled",
    message: `Your appointment at ${hospitalName} scheduled for ${appointmentDate} has been cancelled. You can book another appointment at any time.`,
  }),

  APPOINTMENT_RESCHEDULED: ({ hospitalName, oldDate, newDate, newTime }) => ({
    title: "Appointment Rescheduled",
    message: `Your appointment at ${hospitalName} has been rescheduled from ${oldDate} to ${newDate} at ${newTime}.`,
  }),

  APPOINTMENT_REMINDER: ({
    hospitalName,
    appointmentDate,
    appointmentTime,
  }) => ({
    title: "Appointment Reminder",
    message: `Reminder: Your blood donation appointment at ${hospitalName} is scheduled for ${appointmentDate} at ${appointmentTime}. We look forward to seeing you tomorrow.`,
  }),

  APPOINTMENT_NO_SHOW: ({ hospitalName }) => ({
    title: "Appointment Marked as No-Show",
    message: `Your appointment at ${hospitalName} has been marked as a no-show. If this was a mistake, please contact the hospital or book another appointment.`,
  }),

  APPOINTMENT_COMPLETED: ({ hospitalName, donationDate }) => ({
    title: "Appointment Completed",
    message: `Thank you for visiting ${hospitalName} on ${donationDate}. If your donation was successful, your contribution will soon help save lives.`,
  }),
};
