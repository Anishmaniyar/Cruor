export const evaluateScreeningRules = (screeningData) => {
  const {
    hasFever,
    takingMedication,
    recentTattoo,
    tattooDate,
    recentSurgery,
    surgeryDate,
    pregnant,
    weight,
    travelHistory,
  } = screeningData;

  const reasons = [];

  if (hasFever) {
    reasons.push("You currently have a fever.");
  }

  if (takingMedication) {
    reasons.push(
      "You are currently taking medication and require medical clearance.",
    );
  }

  if (weight < 50) {
    reasons.push("Minimum donor weight is 50 kg.");
  }

  if (pregnant) {
    reasons.push("Pregnant donors are temporarily deferred.");
  }

  if (travelHistory) {
    reasons.push(
      "Recent travel requires additional medical screening before donation.",
    );
  }

  if (recentTattoo && tattooDate) {
    const tattoo = new Date(tattooDate);
    const today = new Date();

    const monthsSinceTattoo =
      (today.getFullYear() - tattoo.getFullYear()) * 12 +
      (today.getMonth() - tattoo.getMonth());

    if (monthsSinceTattoo < 6) {
      reasons.push(
        "You must wait at least 6 months after getting a tattoo or piercing.",
      );
    }
  }

  if (recentSurgery && surgeryDate) {
    const surgery = new Date(surgeryDate);
    const today = new Date();

    const monthsSinceSurgery =
      (today.getFullYear() - surgery.getFullYear()) * 12 +
      (today.getMonth() - surgery.getMonth());

    if (monthsSinceSurgery < 6) {
      reasons.push(
        "You must wait until you have fully recovered from your recent surgery.",
      );
    }
  }

  return {
    eligible: reasons.length === 0,
    reasons,
  };
};
