export const bloodRequestTemplates = {
  BLOOD_REQUEST_APPROVED: ({
    bloodGroup,
    unitsRequired,
    sourceHospitalName,
  }) => ({
    title: "Blood Request Approved",
    message: `Your request for ${unitsRequired} unit(s) of ${bloodGroup} blood has been approved by ${sourceHospitalName}. The blood transfer process will begin shortly.`,
  }),

  BLOOD_REQUEST_REJECTED: ({ bloodGroup, unitsRequired, reason }) => ({
    title: "Blood Request Rejected",
    message: `Your request for ${unitsRequired} unit(s) of ${bloodGroup} blood could not be approved.${reason ? ` Reason: ${reason}.` : ""} Please review the request details or submit a new request if necessary.`,
  }),
};
