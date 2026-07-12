const allowedTransitions = {
  PENDING: ["DISPATCHED"],
  DISPATCHED: ["RECEIVED"],
  RECEIVED: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

export default allowedTransitions;
