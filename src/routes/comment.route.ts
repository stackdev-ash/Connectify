import { Router } from "express";
import { deleteComment } from "../controllers/comment.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.delete("/:id", protect, deleteComment);

export default router