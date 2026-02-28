import express from "express";
import {
  registerUser,
  loginuser,
  loginadmin,
  userget,
  updateuser,
  deleteuser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login/user", loginuser);
router.post("/login/admin", loginadmin);
router.get("/", userget);
router.put("/update/:id", updateuser);
router.delete("/delete/:id", deleteuser);

export default router;
