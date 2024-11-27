import { Router } from "express";
import {
  createNotice,
  deleteNotice,
  getNotice,
  getNoticeById,
} from "../controller/notice-controller.js";
import { auth } from "../middleware/auth.js";

export const noticeRouter = Router();

noticeRouter.route("/create").post(createNotice);
noticeRouter.route("/getallnotice").get(getNotice);
noticeRouter.route("/getmynotice").get(auth, getNoticeById);
noticeRouter.route("/:id").delete(auth, deleteNotice);
