import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    
    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error("JWT_SECRET is missing");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.userId = decoded.userId as string;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
