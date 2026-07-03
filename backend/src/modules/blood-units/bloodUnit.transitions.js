export const allowedTranistions = {
  AVAILABLE: ["RESERVED", "EXPIRED"],

  RESERVED: ["AVAILABLE", "TRANSFERRED"],

  TRANSFERRED: ["TRANSFUSED"],

  TRANSFUSED: [],

  EXPIRED: [],
};
