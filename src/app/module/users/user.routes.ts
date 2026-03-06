import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, UserController.getMe);
router.patch("/me", authMiddleware, UserController.updateMe);
router.delete("/me", authMiddleware, UserController.deleteMe);

export const UserRoutes = router;