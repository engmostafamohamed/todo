/**
 * Required External Modules
 */
import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/api/index";
import * as dotenv from "dotenv";
import helmet from "helmet";

/**
 * App Variables
 */
dotenv.config();
const app = express();
app.set("port", config.PORT);
/**
 *  App Configuration
 */
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

export default app;
