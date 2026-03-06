import { Request, Response, NextFunction } from "express";
import { firebaseAdmin } from "../config/firebase";
import { prisma } from "../lib/prisma";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = header.split(" ")[1];

    const decoded = await firebaseAdmin.auth().verifyIdToken(token);

    const user = await prisma.user.upsert({
      where: { firebaseUid: decoded.uid },
      update: {},
      create: {
        firebaseUid: decoded.uid,
        email: decoded.email!,
        name: decoded.name || "User",
        avatar: decoded.picture || null,
      },
    });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};