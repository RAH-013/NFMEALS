import { Router } from "express";

import { ALTCHA_SECRET, FRONT_PORT, FRONT_URI } from "../config/env.js";
import { createChallenge } from "altcha-lib";

import { authUser, verifyEmail, verifyEmailToken, getUserData, createUser, deleteUser } from "../controller/user.js";
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
    (req, res) => {
        res.redirect(`${FRONT_URI}:${FRONT_PORT}/authenticate?token=${req.user.token}`);
    }
);

router.post("/login", loginLimiter, authUser);

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

router.get("/me", authenticate, getUserData);

//router.put("/:userId", authenticate, updateUser);

router.delete("/:userId", authenticate, deleteUser);

router.get("/:userId", authenticate, authorizeAdmin, getUserData);

export default router;
