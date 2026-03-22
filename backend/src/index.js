import { PORT } from "./config/env.js";
import { errorHandler } from "./middleware/auth.js";
import { createRootUser } from "./controller/user.js";

import { apiLimiter } from "./middleware/rateLimit.js";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";

import sequelize from "./config/db.js";
import userRoutes from "./routes/users.js";

const app = express();

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

app.use(helmet());
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(apiLimiter);
app.use(passport.initialize());

// Rutas
app.use("/api/users", userRoutes);

// Middleware de errores
app.use(errorHandler);

const syncDatabase = async (retries = 10) => {
  try {

    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada (mySQL)");

  } catch (err) {

    if (retries === 0) throw err;

    console.log(`Conexión a la base de datos fallida. Intento ${11 - retries}/10`);
    await sleep(5000);

    return syncDatabase(retries - 1);
  }
};

const startServer = async () => {
  try {

    await syncDatabase();

    await createRootUser();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });

  } catch (err) {

    console.error("Error al iniciar el servidor:", err);
    process.exit(1);

  }
};

startServer();