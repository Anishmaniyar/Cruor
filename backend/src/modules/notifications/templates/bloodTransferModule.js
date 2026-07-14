export const bloodTransferTemplates = {
  BLOOD_TRANSFER_CREATED: ({
    sourceHospitalName,
    destinationHospitalName,
    bloodGroup,
    unitsTransferred,
  }) => ({
    title: "Blood Transfer Created",
    message: `${unitsTransferred} unit(s) of ${bloodGroup} blood have been allocated for transfer from ${sourceHospitalName} to ${destinationHospitalName}. The receiving hospital will be notified once the shipment is dispatched.`,
  }),

  BLOOD_TRANSFER_DISPATCHED: ({
    sourceHospitalName,
    destinationHospitalName,
    bloodGroup,
    unitsTransferred,
  }) => ({
    title: "Blood Transfer Dispatched",
    message: `${unitsTransferred} unit(s) of ${bloodGroup} blood have been dispatched from ${sourceHospitalName} and are currently en route to ${destinationHospitalName}.`,
  }),

  BLOOD_TRANSFER_RECEIVED: ({
    sourceHospitalName,
    destinationHospitalName,
    bloodGroup,
    unitsTransferred,
  }) => ({
    title: "Blood Transfer Received",
    message: `${destinationHospitalName} has successfully received ${unitsTransferred} unit(s) of ${bloodGroup} blood transferred from ${sourceHospitalName}.`,
  }),

  BLOOD_TRANSFER_COMPLETED: ({
    sourceHospitalName,
    destinationHospitalName,
    bloodGroup,
    unitsTransferred,
  }) => ({
    title: "Blood Transfer Completed",
    message: `The transfer of ${unitsTransferred} unit(s) of ${bloodGroup} blood from ${sourceHospitalName} to ${destinationHospitalName} has been completed successfully.`,
  }),

  BLOOD_TRANSFER_CANCELLED: ({
    sourceHospitalName,
    destinationHospitalName,
    bloodGroup,
    unitsTransferred,
  }) => ({
    title: "Blood Transfer Cancelled",
    message: `The transfer of ${unitsTransferred} unit(s) of ${bloodGroup} blood from ${sourceHospitalName} to ${destinationHospitalName} has been cancelled.`,
  }),
};
