import "dotenv/config";

const { PORT: ENV_PORT, JWT_SECRET: ENV_JWT_SECRET } = process.env;

if (!ENV_PORT) {
  throw new Error("ENV_PORT variable does not configure");
}

if (!ENV_JWT_SECRET) {
  throw new Error("JWT_SECRET variable does not configure");
}

const PORT = ENV_PORT;

const JWT_SECRET = ENV_JWT_SECRET;

export { PORT, JWT_SECRET };
