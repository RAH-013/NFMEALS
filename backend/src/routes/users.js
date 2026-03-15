import { Router } from "express";

import { authUser, getUserData, getUserProfile, createUser, updateUser, deleteUser } from "../controller/user.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/login", authUser);

router.post("/register", createUser);

router.get("/me", authenticate, getUserProfile);

router.put("/update/:id", authenticate, updateUser);

router.delete("/delete/:id", authenticate, deleteUser);

router.get("/:id", authenticate, authorizeAdmin, getUserData);

export default router;
