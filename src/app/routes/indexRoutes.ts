import { Router } from "express";
import { UserRoutes } from "../module/users/user.routes";

const router = Router()

router.use("/users", UserRoutes);

export const IndexRoutes = router;