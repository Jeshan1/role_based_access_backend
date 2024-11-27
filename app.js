import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRoute } from "./routes/user-route.js";
import { noticeRouter } from "./routes/notice-router.js";

export const app = express();
dotenv.config({
  path: ".env",
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/notice", noticeRouter);
