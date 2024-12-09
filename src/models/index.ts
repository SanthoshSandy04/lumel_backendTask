import { config } from "dotenv";
import { Sequelize } from "sequelize";
import { initModels } from "./init-models";

config({ path: ".env" });

// DB Configuration
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT }: any =
  process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  logging: false,
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Initialize Sequelize Models
const models = initModels(sequelize);

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }

  // To sync the models with the database
  await sequelize.sync();
}

main().catch(console.error);

export { sequelize, models };
