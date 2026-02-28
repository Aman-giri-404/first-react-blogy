import { Admin } from "mongodb";
import User from "../models/User.js";
// Create user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
export const loginuser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, password, role: "user" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login admin
export const loginadmin = async (req, res) => {
  try {
    const roleadmin = req.query.role || "admin";
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, password, role: roleadmin });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user and admin
export const userget = async (req, res) => {
  try {
    // 1. Get role from query params (e.g., ?role=admin)
    // 2. If no role is provided, default to "user"
    const roleParam = req.query.role || "user";

    // 3. Find documents where the role matches the parameter
    const users = await User.find({ role: roleParam });

    res.status(200).json({
      message: `Successfully fetched lists for role: ${roleParam}`,
      count: users.length,
      users, // This contains the filtered list
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
export const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatebyid = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "Successfully update",
      updatebyid, // This contains the filtered list
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
export const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletebyid = await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "Successfully delete",
      deletebyid, // This contains the filtered list
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
