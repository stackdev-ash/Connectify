import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { getFeed,getUserProfile } from "../controllers/profile.controller";

const router = Router();

router.get("/feed", protect, getFeed);

router.get("/:username", getUserProfile);

export default router;
