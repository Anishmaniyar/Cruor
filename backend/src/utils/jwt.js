import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const data = {
    id: user.id,
    name: user.name,
  };
  jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (user) => {
  const data = {
    id: user.id,
    name: user.name,
  };
  jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};
