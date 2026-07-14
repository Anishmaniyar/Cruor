export const campaignTemplates = {
  CAMPAIGN_REGISTERED: ({ campaignName, campaignDate, hospitalName }) => ({
    title: "Campaign Registration Confirmed",
    message: `You have successfully registered for "${campaignName}" hosted by ${hospitalName} on ${campaignDate}. Thank you for stepping forward to save lives.`,
  }),

  CAMPAIGN_REGISTRATION_CANCELLED: ({
    campaignName,
    campaignDate,
    hospitalName,
  }) => ({
    title: "Campaign Registration Cancelled",
    message: `Your registration for "${campaignName}" at ${hospitalName} scheduled on ${campaignDate} has been cancelled. You can register again if slots become available.`,
  }),

  CAMPAIGN_UPDATED: ({ campaignName, hospitalName }) => ({
    title: "Campaign Details Updated",
    message: `${hospitalName} has updated the details for "${campaignName}". Please review the latest campaign information before attending.`,
  }),

  CAMPAIGN_CANCELLED: ({ campaignName, hospitalName }) => ({
    title: "Campaign Cancelled",
    message: `We regret to inform you that "${campaignName}" organized by ${hospitalName} has been cancelled. We apologize for the inconvenience and encourage you to join another upcoming campaign.`,
  }),

  CAMPAIGN_REMINDER: ({
    campaignName,
    campaignDate,
    campaignTime,
    hospitalName,
  }) => ({
    title: "Campaign Reminder",
    message: `Reminder: "${campaignName}" hosted by ${hospitalName} is scheduled for ${campaignDate} at ${campaignTime}. We look forward to seeing you there.`,
  }),

  WAITLIST_APPROVED: ({ campaignName, hospitalName }) => ({
    title: "You're Off the Waitlist!",
    message: `Good news! A spot has become available for "${campaignName}" at ${hospitalName}. Your registration has been confirmed, and we look forward to your participation.`,
  }),
};
