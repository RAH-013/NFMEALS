import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-06:00",
  logging: false,
});

export default sequelize;