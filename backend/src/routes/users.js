import { Router } from "express";

import { ALTCHA_SECRET } from "../config/env.js";
import { createChallenge } from "altcha-lib";

import { authUser, getUserData, createUser, deleteUser } from "../controller/user.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

import { challengeLimiter, loginLimiter, registerLimiter } from "../middleware/rateLimit.js";

// Import temporal
import { sendEmail } from "../config/mailer.js";

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
        res.redirect(`https://localhost:5173/authenticate?token=${req.user.token}`);
    }
);

router.post("/login", loginLimiter, authUser);

router.post("/register", registerLimiter, createUser);

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


router.post("/send-email", async (req, res) => {
    try {
        const result = await sendEmail({
            to: "qluf3g6mu5@bwmyga.com",
            subject: "Correo Prueba",
            html: `<h2>Hola Mundo</h2>`
        })

        res.json({
            success: true,
            messageId: result.messageId
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

export default router;
