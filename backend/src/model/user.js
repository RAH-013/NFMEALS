import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const User = sequelize.define(
  "users",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.TEXT,
    role: { type: DataTypes.ENUM("customer", "admin"), defaultValue: "customer" },
  },
  {
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  },
);

export default User;
