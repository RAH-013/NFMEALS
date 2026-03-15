import { Sequelize } from "sequelize";
import { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT } from "./env.js"

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: "mysql",
  port: MYSQL_PORT,
  timezone: "-06:00",
  logging: false,
});

export default sequelize;