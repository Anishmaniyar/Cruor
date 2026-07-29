import AppError from "../../utils/appError.js";
import * as DonationRepository from "./donation.repository.js";
import * as CampaginRepository from "../campaign/campaign.repository.js";
import * as NotificationService from "../notifications/notification.service.js";
import { NotificationType } from "../notifications/notification.constants.js";
import prisma from "../../db.js";

export const donationAppointmentService = async (
  appointmentId,
  hospitalId,
  donationData,
) => {
  const appointmentExists =
    await DonationRepository.findAppointmentById(appointmentId);

  if (!appointmentExists) {
    throw new AppError("Appointment not found", 404);
  }

  const validAppointment =
    await DonationRepository.appointmentBelongsToHospitalRepo(
      appointmentId,
      hospitalId,
    );

  if (!validAppointment) {
    throw new AppError(
      "Hospital does not have appointment or appointment is not valid now",
      404,
    );
  }

  const userId = validAppointment.userId;

  const existingDonation = await DonationRepository.existingDonationRepo(
    hospitalId,
    appointmentId,
  );

  if (existingDonation) {
    throw new AppError(
      "A donation has already been recorded for the appointment",
    );
  }

  return await prisma.$transaction(async (tx) => {
    const donation = await DonationRepository.createDonationRepo(tx, {
      ...donationData,
      appointmentId,
      hospitalId,
      userId,
    });

    await DonationRepository.updateAppointmentStatusRepo(tx, appointmentId);

    // await InventoryRepository.createInventoryEntryRepo(tx, {
    //   hospitalId,
    //   userId,
    //   donationId: donation.id,
    //   bloodGroup: donation.bloodGroup,
    //   quantity: donation.quantity,
    //   componentType: donation.componentType,
    // });

    // await NotificationService.send()

    return donation;
  });
};

export const donationCampaignService = async (
  hospitalId,
  registrationId,
  donationData,
) => {
  // 1. Query CampaignRegistration table using registrationId
  const registration = await CampaginRepository.findRegistrationById(
    registrationId,
  );

  if (!registration) {
    throw new AppError("Campaign registration not found", 404);
  }

  // 2. Check if registration status is still valid
  if (registration.status !== "REGISTERED") {
    throw new AppError(
      "Campaign registration is already completed or cancelled",
      400,
    );
  }

  // 3. Extract campaignId and userId from the registration record
  const campaignId = registration.campaign.id;
  const userId = registration.userId;

  // 4. Query Campaign table using campaignId to verify hospital ownership
  const hospitalOwnsCampaign = await CampaginRepository.findCampaignByHospital(
    hospitalId,
    campaignId,
  );

  if (!hospitalOwnsCampaign) {
    throw new AppError("Hospital does not own this campaign", 403);
  }

  // 5. Check if a donation already exists for this registration
  const existingDonation =
    await DonationRepository.existingCampaignDonationRepo(registrationId);

  if (existingDonation) {
    throw new AppError(
      "A donation has already been recorded for this campaign registration",
      400,
    );
  }

  // 6. Create donation and update registration status in a transaction
  return await prisma.$transaction(async (tx) => {
    const donation = await DonationRepository.createDonationRepo(tx, {
      ...donationData,
      campaignRegistrationId: registrationId,
      hospitalId,
      userId,
    });

    // 7. Update Campaign Registration Status to COMPLETED
    await DonationRepository.updateCampaignRegistrationStatusRepo(
      tx,
      registrationId,
      "COMPLETED",
    );

    return donation;
  });
};

export const viewMyDonationService = async (userId) => {
  const donations = DonationRepository.viewMyDonationUserRepo(userId);

  return donations;
};

export const viewMyDonationIdService = async (userId, donationId) => {
  const donations = DonationRepository.viewMyDonationUserIdRepo(
    userId,
    donationId,
  );

  return donations;
};

export const viewHospitalDonationService = async (hospitalId) => {
  const donations = await DonationRepository.viewHospitalDonationRepo(hospitalId);

  return donations;
};

export const rejectDonationService = async (donationId, hospitalId) => {
  const donationExists =
    await DonationRepository.findDonationForRejectionRepo(donationId, hospitalId);

  if (!donationExists) {
    throw new AppError("Donation not found", 404);
  }

  if (donationExists.status === "REJECTED") {
    throw new AppError("This donation has already been rejected", 400);
  }

  const hospitalOwnsDonation =
    await DonationRepository.findHospitalDonationRepository(
      hospitalId,
      donationId,
    );

  if (!hospitalOwnsDonation) {
    throw new AppError("Hospital does not own the donation", 403);
  }

  const updatedDonation = await DonationRepository.updateDonationStatusRepo(
    donationId,
    "REJECTED",
  );

  return updatedDonation;
};

export const completeDonationService = async (donationId, hospitalId) => {
  const donationExists =
    await DonationRepository.findDonationForRejectionRepo(donationId, hospitalId);

  if (!donationExists) {
    throw new AppError("Donation not found", 404);
  }

  if (donationExists.status === "REJECTED") {
    throw new AppError("This donation has already been rejected", 400);
  }

  const hospitalOwnsDonation =
    await DonationRepository.findHospitalDonationRepository(
      hospitalId,
      donationId,
    );

  if (!hospitalOwnsDonation) {
    throw new AppError("Hospital does not own the donation", 403);
  }

  const updatedDonation = await DonationRepository.updateDonationStatusRepo(
    donationId,
    "COMPLETED",
  );

  await NotificationService.send({
    type: NotificationType.DONATION_COMPLETED,

    recipient: {
      userId: donationExists.userId,
    },

    payload: {
      hospitalName: hospitalOwnsDonation.hospital.name,
      donationDate: hospitalOwnsDonation.donationDate,
    },
  });

  return updatedDonation;
};

export const viewDashboardPageService = async (userId) => {
  const totalDonations = await DonationRepository.countAllDonation(userId);

  const appointmentDonations =
    await DonationRepository.countAppointmentDonation(userId);

  const campaignDonations =
    await DonationRepository.countCampaignDonation(userId);

  const livesImpacted = totalDonations * 3;

  const lastDonationDate = await DonationRepository.getLastDonationDate(userId);

  const donationHistory =
    await DonationRepository.viewUserHistoryDonation(userId);

  return {
    totalDonations,
    appointmentDonations,
    campaignDonations,
    livesImpacted,
    lastDonationDate,
    donationHistory,
  };
};
