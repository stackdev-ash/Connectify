import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createComment = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    const postId = req.params.id as string;
    const { content } = req.body;
    if (!content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required",
      });
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const comment = await prisma.comment.create({
      data: {
        content,
        userId: req.userId,
        postId,
      },

      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });
    return res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id as string;
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const commentId = req.params.id as string;

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
