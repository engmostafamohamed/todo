import { Pool } from "pg";
import config from "../config";
const pool = new Pool({
  host: config.MONGO_HOST,
  database: config.MONGO_DATABASE,
  user: config.MONGO_USER,
  password: config.MONGO_PASSWORD,
  port: parseInt(config.PORT as string, 10),
  // max:4,
});
pool.on("error", (error: Error) => {
  // console.error(error.message);
  console.error("Unexpected error in Postgress connection pool", error);
});
export default pool;
