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

    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    lastname: {
      type: DataTypes.STRING(100),
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { isEmail: true }
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    phoneNumber: {
      type: DataTypes.STRING(20)
    },

    address: {
      type: DataTypes.STRING(255)
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
        fields: ["email"]
      }
    ]
  }
);

export default User;