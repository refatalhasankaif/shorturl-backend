import { Router } from "express";
import { UserRoutes } from "../module/users/user.routes";
import { UrlRoutes } from "../module/url/url.routes";

const router = Router()

router.use("/users", UserRoutes);
router.use("/url", UrlRoutes);

export const IndexRoutes = router;