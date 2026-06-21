import { Router } from "express";
import {
  CreatePost,
  GetPost,
  GetPosts,
  DeletePost,
} from "../controllers/post.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", GetPosts);

router.get("/:id", GetPost);

router.post("/", protect, CreatePost);

router.delete("/:id", protect, DeletePost);

export default router;
