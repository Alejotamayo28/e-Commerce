import dotenv from "dotenv";

dotenv.config();

export const Envconfig = {
  env: process.env.NODE_ENV,
  dbUser: process.env.USER,
  dbPassword: process.env.PASSWORD,
  dbHost: process.env.HOST,
  dbName: process.env.NAME,
  dbPort: process.env.PORT,
};
