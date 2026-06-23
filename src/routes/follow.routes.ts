import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { followUser, unfollowUser } from "../controllers/follow.controller";

const router = Router();

router.post("/:id/follow", protect, followUser);

router.delete("/:id/follow", protect, unfollowUser);

export default router;
