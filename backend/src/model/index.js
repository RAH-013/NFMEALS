import sequelize from "../config/db.js";

import User from "./user.js";
import UserProfile from "./userProfile.js";

User.hasOne(UserProfile, {
    foreignKey: "userId",
    as: "profile",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    hooks: true
});

UserProfile.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

export { sequelize, User, UserProfile };