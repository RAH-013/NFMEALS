import { Router } from "express";

import { authUser, getUserData, getUserProfile, createUser, updateUser, deleteUser } from "../controller/user.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/login", authUser);

router.post("/register", createUser);

router.get("/me", authenticate, getUserData);

router.put("/update/:id", authenticate, updateUser);

router.delete("/delete/:id", authenticate, deleteUser);

export default router;
