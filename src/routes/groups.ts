// src/routes/groupRoutes.ts
import express from "express";
import { createGroup, getUsersWithoutGroup } from "../controllers/groups";

const router = express.Router();

router.post("/create", createGroup);

router.get("/users-without-group", getUsersWithoutGroup);

// router.post('/groups/invite', sendInvitation);

export default router;
