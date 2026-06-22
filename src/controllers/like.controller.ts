import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const likePost = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    const postId = req.params.id as string;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
    const existinglike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: req.userId,
          postId,
        },
      },
    });
    if (existinglike) {
      return res.status(400).json({
        success: false,
        message: "Post already liked",
      });
    }

    await prisma.like.create({
      data: {
        userId: req.userId,
        postId,
      },
    });

    const likesCount = await prisma.like.count({
      where: {
        postId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Post liked",
      likesCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    const postId = req.params.id as string;

    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: req.userId,
          postId,
        },
      },
    });
    if (!like) {
      return res.status(404).json({
        success: false,
        message: "like not found",
      });
    }
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    const likesCount = await prisma.like.count({
      where: {
        postId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Post unliked",
      likesCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
