export const donationTemplates = {
  DONATION_COMPLETED: ({ hospitalName, donationDate }) => ({
    title: "Thank You for Your Donation",
    message: `Thank you for donating blood at ${hospitalName} on ${donationDate}. Your generous contribution has the potential to save multiple lives. We truly appreciate your support.`,
  }),

  CERTIFICATE_READY: ({ donationDate }) => ({
    title: "Your Donation Certificate is Ready",
    message: `Your blood donation certificate for your donation on ${donationDate} is now available. You can download it anytime from your profile.`,
  }),

  BLOOD_TEST_FAILED: ({ hospitalName }) => ({
    title: "Blood Donation Update",
    message: `Your blood donation at ${hospitalName} could not be processed due to screening results. Please contact the hospital if you have any questions or would like more information.`,
  }),
};
