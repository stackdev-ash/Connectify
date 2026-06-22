import { Router } from "express";
import {
  CreatePost,
  GetPost,
  GetPosts,
  DeletePost,
} from "../controllers/post.controller";
import { likePost, unlikePost } from "../controllers/like.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", GetPosts);

router.get("/:id", GetPost);

router.post("/", protect, CreatePost);

router.delete("/:id", protect, DeletePost);

router.post("/:id/like", protect, likePost);

router.delete("/:id/like", protect, unlikePost);

export default router;