import { Router } from "express";
import { UrlController } from "./url.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", UrlController.createUrl);
router.get("/my", authMiddleware, UrlController.getMyUrls);

router.patch("/:id", authMiddleware, UrlController.updateUrl);
router.delete("/:id", authMiddleware, UrlController.deleteUrl);

export const UrlRoutes = router;