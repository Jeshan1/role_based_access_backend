import e from "express";
import { genToken } from "../config/genToken.js";
import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";

export const signupUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username) {
      throw new Error("Username is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    if (!email) {
      throw new Error("Email is required");
    }
    if (!role) {
      throw new Error("Role is required");
    }

    const findUser = await User.findOne({
      email,
    });

    if (findUser) {
      throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      username,
      password: hashPassword,
      email,
      role,
    });

    if (!createUser) {
      throw new Error("User not created");
    }
    res
      .status(201)
      .json({
        createUser,
        message: "User created successfully",
        success: true,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email,password)
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }

    if (!role) {
      throw new Error("Role is required");
    }

    const findUser = await User.findOne({
      email,
    });

    if (!findUser) {
      throw new Error("User not found");
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) {
      throw new Error("Password is incorrect");
    }

    const token = genToken(findUser._id, findUser.role);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      expires: new Date(new Date().getTime() + 3600000),
    });

    res.status(200).json({
      user: findUser,
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllusers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      throw new Error("Users not found");
    }
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Id is required");
    }

    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      throw new Error("User not deleted");
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;
    if (!id) {
      throw new Error("Id is required");
    }
    if (!role) {
      throw new Error("Role is required");
    }

    const updateRole = await User.findByIdAndUpdate(id, {
      role,
    });

    if (!updateRole) {
      throw new Error("Role not updated");
    }
    res
      .status(200)
      .json({ message: "Role updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const mySelf = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).json({ user, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
