import dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";
export const genToken = (id,role) => {
  return jwt.sign(
    { id,role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};
