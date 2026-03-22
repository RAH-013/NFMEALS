import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },

    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    provider: {
      type: DataTypes.ENUM("local", "google"),
      allowNull: false,
      defaultValue: "local"
    },

    providerId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    role: {
      type: DataTypes.ENUM("customer", "admin"),
      defaultValue: "customer"
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["provider", "providerId"]
      }
    ]
  }
);

export default User;