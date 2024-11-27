import { Notice } from "../models/notice-model.js";
import { User } from "../models/user-model.js";

export const createNotice = async (req, res) => {
  try {
    const { title, notice, access } = req.body;
    if (!title) {
      throw new Error("Title is required");
    }
    if (!notice) {
      throw new Error("Notice is required");
    }
    if (!access || access.length === 0) {
      throw new Error("Access is required");
    }

    const createNotice = await Notice.create({
      title,
      notice,
      access,
    });

    if (!createNotice) {
      throw new Error("Notice not created");
    }
    res
      .status(201)
      .json({ createNotice, message: "Notice created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotice = async (req, res) => {
  try {
    const allNotice = await Notice.find();
    if (!allNotice) {
      throw new Error("Notice not found");
    }
    res.status(200).json({ allNotice, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNoticeById = async (req, res) => {
  try {
    const id = req.user;
    console.log(id);
    const findUser = await User.findById(id);
    if (!findUser) {
      throw new Error("User not found");
    }
    const notice = await Notice.find({ access: { $in: [findUser.role] } });
    console.log(notice);
    if (notice.length < 1) {
      throw new Error("Notice not found");
    }
    res.status(200).json({ notice, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Id is required");
    }

    const deleteNotice = await Notice.findByIdAndDelete(id);

    if (!deleteNotice) {
      throw new Error("Notice not deleted");
    }
    res
      .status(200)
      .json({ message: "Notice deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
