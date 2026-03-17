import { Router } from "express";

import { authUser, getUserData, getUserProfile, createUser, updateUser, deleteUser } from "../controller/user.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

import { loginLimiter, registerLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.post("/login", loginLimiter, authUser);

router.post("/register", registerLimiter, createUser);

router.get("/me", authenticate, getUserProfile);

router.put("/:userId", authenticate, updateUser);

router.delete("/:userId", authenticate, deleteUser);

router.get("/:userId", authenticate, authorizeAdmin, getUserData);

export default router;
