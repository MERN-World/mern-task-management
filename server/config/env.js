import { config as dotEnvConfig } from "dotenv";

dotEnvConfig({
  path:".env"
});

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_EXPIRES: process.env.ACCESS_EXPIRES || 5,
  REFRESH_DAYS: process.env.REFRESH_DAYS || 15,
  COOKIE_NAME: "refreshToken",
  COOKIE_SAMESITE:"Strict",
  PASSWORD_SALT: 10,

};
