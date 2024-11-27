import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("server started");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
