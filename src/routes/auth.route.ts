import { Router } from "express";
import {
  login,
  logout,
  register,
  getMe,
  changePassword,
  updateProfile,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", protect, getMe);

router.patch("/change-password", protect, changePassword);

router.put("/update-profile", protect, updateProfile);

export default router;
