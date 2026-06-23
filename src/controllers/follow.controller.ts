import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const followUser = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    const followingId = req.params.id as string;

    if (followingId === req.userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: followingId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: req.userId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      return res.status(400).json({
        success: false,
        message: "Already following this user",
      });
    }

    await prisma.follow.create({
      data: {
        followerId: req.userId,
        followingId,
      },
    });

    const followersCount = await prisma.follow.count({
      where: {
        followingId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User followed successfully",
      followersCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const followingId = req.params.id as string;

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: req.userId,
          followingId,
        },
      },
    });

    if (!follow) {
      return res.status(404).json({
        success: false,
        message: "Follow relationship not found",
      });
    }

    await prisma.follow.delete({
      where: {
        id: follow.id,
      },
    });

    const followersCount = await prisma.follow.count({
      where: {
        followingId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
      followersCount,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
