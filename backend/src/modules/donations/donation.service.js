import { AppError } from "../../utils/appError.js";
import * as DonationRepository from "./donation.repository.js";
import * as CampaginRepository from "../campaign/campaign.repository.js";

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

  const newDonation = await DonationRepository.createDonationRepo({
    ...donationData,
    appointmentId,
    hospitalId,
    userId,
  });

  // NOTIFICATON LEFT TO BE ADDED
  return newDonation;
};

export const donationCampaignService = async (
  hospitalId,
  registratonId,
  donationData,
) => {
  const campaginExists = await CampaginRepository.findCampaignId(registratonId);

  if (!campaginExists) {
    throw new AppError("Campaign does not exists", 404);
  }

  if (campaginExists.status != "REGISTERED") {
    throw new AppError("Campaign registration is Cancelled or Missed", 404);
  }

  const finalCampaignId = campaignData.id;

  const firstRegistration = campaignData.campaignRegistrations[0];

  if (!firstRegistration) {
    throw new AppError("No registration found for this campaign", 404);
  }

  const userId = firstRegistration.userId;

  const hospitalOwnsCampaign = await CampaginRepository.hospitalOwnedCampaign(
    hospitalId,
    registratonId,
  );

  if (!hospitalOwnsCampaign) {
    throw new AppError("Hopsital does not owns campaign", 403);
  }

  const newDonation = await DonationRepository.createDonationRepo({
    ...donationData,
    appointmentId,
    hospitalId,
    userId,
  });

  // NOTIFICATON LEFT TO BE ADDED
  return newDonation;
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
  const dontion = await DonationRepository.viewHospitalDonationRepo(hospitalId);

  return donation;
};

export const rejectDonationService = async (donationId, hospitalId) => {
  const donationExists =
    await DonationRepository.findDonationForRejectionRepo(donationId);

  if (!donationExists) {
    throw new AppError("Donation already exists", 404);
  }

  if (donation.status === "REJECTED") {
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
    await DonationRepository.findDonationForRejectionRepo(donationId);

  if (!donationExists) {
    throw new AppError("Donation already exists", 404);
  }

  if (donation.status === "REJECTED") {
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

  return updatedDonation;
};
