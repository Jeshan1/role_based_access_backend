import { Router } from "express";
import {
  deleteUser,
  getAllusers,
  loginUser,
  logoutUser,
  mySelf,
  signupUser,
  updateRole,
} from "../controller/user-controller.js";
import { auth } from "../middleware/auth.js";

export const userRoute = Router();

userRoute.route("/signup").post(signupUser);
userRoute.route("/login").post(loginUser);
userRoute.route("/alluser").get(getAllusers);
userRoute.route("/logout").get(logoutUser);
userRoute.route("/myself").get(auth,mySelf);
userRoute.route("/:id/role").patch(updateRole);
userRoute.route("/:id").delete(deleteUser);
