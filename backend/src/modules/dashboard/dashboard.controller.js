import asyncHandler from "../../utils/asyncHandler.js";
import prisma from "../../db.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const [totalDonations, lastDonation, nextAppointment, nearByCampaigns] =
    await Promise.all([
      prisma.donation.count({ where: { userId } }),
      prisma.donation.findFirst({
        where: { userId },
        orderBy: { donationDate: "desc" },
      }),
      prisma.appointment.findFirst({
        where: {
          userId,
          status: "CONFIRMED",
          appointmentDate: { gte: new Date() },
        },
        orderBy: { appointmentDate: "asc" },
        include: { hospital: { select: { name: true } } },
      }),
      prisma.campaign.findMany({
        where: { campaignDate: { gte: new Date() }, status: "ACTIVE" },
        take: 5,
        include: { hospital: { select: { name: true, address: true } } },
      }),
    ]);

  const livesImpacted = totalDonations * 2;

  let eligiblity = null;
  if (lastDonation) {
    const d = new Date(lastDonation.donationDate);
    d.setMonth(d.getMonth() + 3);
    eligiblity = d;
  }

  res.json({
    status: "success",
    data: {
      totalDonations,
      livesImpacted,
      nextAppointment: nextAppointment
        ? {
            date: nextAppointment.appointmentDate,
            time: nextAppointment.appointmentTime,
            hospital: nextAppointment.hospital.name,
          }
        : null,
      eligiblity,
      nearByCampaigns,
    },
  });
});
