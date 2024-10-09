import { Router } from "express";

import { configController, getConfig } from "../controllers/configApp";

const router = Router();

router.post("/set", configController);
router.get("/", getConfig);

export default router;
