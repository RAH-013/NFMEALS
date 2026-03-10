import express from "express"
import sequelize from "./config/database.js"

const app = express()

async function start() {
    try {
        await sequelize.authenticate()
        console.log("Database connected")

        await sequelize.sync()

        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`)
        })

    } catch (err) {
        console.error("Database connection error:", err)
        process.exit(1)
    }
}

start()