import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST,
  PORT: process.env.PORT,
  // SERVER_TOKEN_EXPIRETIME: process.env.SERVER_TOKEN_EXPIRETIME || 3600,
  // SERVER_TOKEN_ISSUER: process.env.SERVER_TOKEN_ISSUER || "coolIssuer",
  // SERVER_TOKEN_SECRET:
  //   process.env.SERVER_TOKEN_SECRET || "superencryptedsecret",
};
