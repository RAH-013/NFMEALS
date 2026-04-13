import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserProfile = sequelize.define(
    "user_profiles",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: "users",
                key: "id"
            }
        },

        profilePicture: {
            type: DataTypes.STRING,
        },

        name: {
            type: DataTypes.STRING(100),
        },

        lastname: {
            type: DataTypes.STRING(100),
        },

        phoneNumber: {
            type: DataTypes.STRING(20),
            unique: true
        },

        street: {
            type: DataTypes.STRING(150)
        },

        exteriorNumber: {
            type: DataTypes.STRING(20)
        },

        interiorNumber: {
            type: DataTypes.STRING(20)
        },

        neighborhood: {
            type: DataTypes.STRING(100)
        },

        city: {
            type: DataTypes.STRING(100)
        },

        municipality: {
            type: DataTypes.STRING(100)
        },

        state: {
            type: DataTypes.STRING(100),
            defaultValue: "Colima"
        },

        postalCode: {
            type: DataTypes.STRING(10)
        },

        country: {
            type: DataTypes.STRING(100),
            defaultValue: "México"
        }
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);

export default UserProfile;