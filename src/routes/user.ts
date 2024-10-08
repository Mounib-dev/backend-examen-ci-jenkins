import { Router } from "express";

import { registerController } from "../controllers/user";

const router = Router();

router.post("/register", registerController);

export default router;
