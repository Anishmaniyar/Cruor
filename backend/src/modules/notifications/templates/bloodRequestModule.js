export const bloodRequestTemplates = {
  BLOOD_REQUEST_ACCEPTED: ({ bloodGroup, unitsRequired }) => ({
    title: "Blood Request Accepted",
    message: `A hospital has accepted your request for ${unitsRequired} unit(s) of ${bloodGroup} blood. You can now view and select their offer.`,
  }),

  BLOOD_REQUEST_REJECTED: ({ bloodGroup, unitsRequired, reason }) => ({
    title: "Blood Request Rejected",
    message: `A hospital has declined your request for ${unitsRequired} unit(s) of ${bloodGroup} blood.${reason ? ` Reason: ${reason}.` : ""}`,
  }),

  BLOOD_REQUEST_OFFER_SELECTED: ({
    bloodGroup,
    unitsRequired,
    transferId,
  }) => ({
    title: "Offer Selected — Blood Transfer Initiated",
    message: `Your offer to provide ${unitsRequired} unit(s) of ${bloodGroup} blood has been accepted. Transfer ID: ${transferId}. Please prepare the blood units for dispatch.`,
  }),

  BLOOD_REQUEST_CANCELLED: ({ bloodGroup, unitsRequired }) => ({
    title: "Blood Request Cancelled",
    message: `The request for ${unitsRequired} unit(s) of ${bloodGroup} blood has been cancelled by the requesting hospital. Your offer is no longer needed.`,
  }),
};
