import { Router } from "express";

import { configController } from "../controllers/configApp";

const router = Router();

router.post("/set", configController);

export default router;
