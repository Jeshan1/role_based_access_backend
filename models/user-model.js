import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "doctor", "patient", "staff"],
    default: "user",
  },
  username: {
    type: String,
    required: false,
    unique: true,
  },
});

export const User = model("User", UserSchema);
