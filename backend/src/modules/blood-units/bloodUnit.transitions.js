export const allowedTransitions = {
  AVAILABLE: ["RESERVED", "EXPIRED"],

  RESERVED: ["AVAILABLE", "TRANSFERRED"],

  TRANSFERRED: ["TRANSFUSED"],

  TRANSFUSED: [],

  EXPIRED: [],
};
