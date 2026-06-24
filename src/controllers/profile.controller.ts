import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const username = req.params.username as string;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },

      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatarUrl: true,
        isVerified: true,

        posts: {
          orderBy: {
            createdAt: "desc",
          },

          include: {
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },

        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getFeed = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const following = await prisma.follow.findMany({
      where: {
        followerId: req.userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((user) => user.followingId);

    followingIds.push(req.userId);

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            authorId: {
              in: followingIds,
            },
          },
          {
            authorId: {
              not: req.userId,
            },
          },
        ],
      },

      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },

        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
    });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
