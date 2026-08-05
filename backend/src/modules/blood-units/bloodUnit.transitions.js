export const allowedTransitions = {
  AVAILABLE: ["RESERVED", "EXPIRED", "REJECTED"],

  RESERVED: ["AVAILABLE", "TRANSFERRED"],

  TRANSFERRED: ["USED"],

  USED: [],

  EXPIRED: [],

  REJECTED: [],
};
