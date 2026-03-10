import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",

        logging: false,

        pool: {
            max: 20,
            min: 2,
            acquire: 30000,
            idle: 10000
        },

        retry: {
            max: 5
        },

        dialectOptions: {
            connectTimeout: 10000
        }
    }
)

export default sequelize