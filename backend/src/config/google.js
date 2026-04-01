import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT, URI } from "./env.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createAuthJWT } from '../utils/jwt.js';
import { User, UserProfile } from "../model/index.js";

import passport from 'passport';

passport.use("auth-google", new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${URI}/api/users/auth/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { email: profile.emails[0].value } });

        if (!user) {
            user = await User.create({
                email: profile.emails[0].value,
                isEmailVerified: true,
                provider: "google",
                providerId: profile.id
            });

            await UserProfile.create({
                userId: user.id,
                name: profile.name?.givenName || '',
                lastname: profile.name?.familyName || '',
                profilePicture: profile.photos[0]?.value || null
            });
        } else {
            const profileRecord = await UserProfile.findOne({ where: { userId: user.id } });
            if (profileRecord) {
                await profileRecord.update({
                    name: profile.name?.givenName || profileRecord.name,
                    lastname: profile.name?.familyName || profileRecord.lastname,
                    profilePicture: profile.photos[0]?.value || profileRecord.profilePicture
                });
            }
        }

        const token = createAuthJWT(user);
        done(null, { user, token });
    } catch (err) {
        done(err);
    }
}));
