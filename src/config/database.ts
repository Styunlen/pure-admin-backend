import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import config from "../config";
import Logger from "../loaders/logger";
Logger.info("sqlFilePath: ", path.join(__dirname, "./../data/database.db"));

const getDatabaseType = () => {
  switch ((config.databaseType as string).toLowerCase()) {
    case "sqlite":
      return "sqlite";
    case "mysql":
      return "mysql";
    default:
      return "sqlite";
  }
};

const getDataSource = () => {
  switch ((config.databaseType as string).toLowerCase()) {
    case "sqlite":
      return new DataSource({
        type: "sqlite",
        database: __dirname + "./../data/database.db",
        synchronize: false,
        logging: true,
        entities: [__dirname + "./../models/**/*{.js,.ts}"],
        migrations: [],
        subscribers: []
      });
    case "mysql":
      return new DataSource({
        type: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: "root",
        password: "pwd",
        database: "data", // 数据库名
        synchronize: false,
        logging: true,
        entities: [__dirname + "./../models/**/*{.js,.ts}"],
        migrations: [],
        subscribers: []
      });
    default:
      return null;
  }
};

/**
 * Documents shortcut:
 * https://typeorm.io/data-source-options
 */
export const connection = getDataSource();

export const connect = async () => {
  if (connection == null) {
    Logger.error(
      "Database type error.Please set database type to the .env file"
    );
    process.exit(1);
  }
  await connection
    .initialize()
    .then(() => {
      Logger.info("Data Source has been initialized!");
    })
    .catch(err => {
      Logger.error("Error during Data Source initialization:", err);
    });
};
