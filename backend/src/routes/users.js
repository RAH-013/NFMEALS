import { Router } from "express";

import { ALTCHA_SECRET, FRONT_PORT, FRONT_URI } from "../config/env.js";
import { createChallenge } from "altcha-lib";

import { authUser, googleAuth, logoutUser, verifyEmail, verifyEmailToken, getUserData, getUserAvatar, createUser, updateUser, deleteUser, getUserProfile, getUsers, getUserDataById } from "../controller/user.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

import { challengeLimiter, loginLimiter, registerLimiter } from "../middleware/rateLimit.js";

import passport from "passport";
import "../config/google.js"

const router = Router();

router.get("/auth",
    passport.authenticate("auth-google", {
        scope: ["profile", "email"]
    })
);

router.get("/auth/callback",
    passport.authenticate("auth-google", { session: false }),
    googleAuth
);

router.post("/login", loginLimiter, authUser);

router.post("/logout", authenticate, logoutUser);

router.post("/register", registerLimiter, createUser);

router.get("/verify-email", loginLimiter, authenticate, verifyEmail);

router.post("/verify-email", loginLimiter, verifyEmailToken);

router.get("/challenge", challengeLimiter, async (req, res) => {
    const challenge = await createChallenge({
        hmacKey: ALTCHA_SECRET,
        maxNumber: 50000,
        expires: new Date(Date.now() + 60 * 1000)
    });

    res.set("Cache-Control", "no-store");
    res.json(challenge);
});

router.get("/all", authenticate, authorizeAdmin, getUsers);

router.get("/profile/:id", authenticate, authorizeAdmin, getUserDataById);

router.get("/me", authenticate, getUserData);

router.get("/me/profile", authenticate, getUserProfile);

router.get("/me/avatar", authenticate, getUserAvatar);

router.put("/", authenticate, updateUser);

router.delete("/", authenticate, deleteUser);

export default router;