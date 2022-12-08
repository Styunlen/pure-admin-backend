import path from "path";
import "reflect-metadata"; // typeorm's dependency
import { DataSource } from "typeorm";
import config from "../config";
import Logger from "../loaders/logger";
import { fileDisplay, fileDisplaySync } from "../utils/fileDisplay";
Logger.info(`sqlFilePath : ${path.join(__dirname, "./../data/database.db")}`);
Logger.info(
  `entitiesFile Path:${path.join(__dirname + "./../models/*{.js,.ts}")}`
);
// { BUG FOUND
//   const arr = [];
//   // indicates if a dir is the last item of fileList readdir returned
//   let isLastDir = true;

//   const fileDisplay = (filePath: string) => {
//     return new Promise((resolve, reject) => {
//       fs.readdir(filePath, function (err, files) {
//         if (err) {
//           console.error("ReadDir Error:");
//           reject(err);
//         }
//         files.forEach((filename, fileIndex, fileArr) => {
//           const filedir = path.join(filePath, filename);
//           fs.stat(filedir, (error, stats) => {
//             if (error) {
//               console.error("Read FileStat Error:");
//               reject(error);
//             }
//             const isFile = stats.isFile();
//             const isDir = stats.isDirectory();
//             console.log(fileIndex, filedir);
//             if (isFile) {
//               arr.push(filedir);
//             }
//             if (isDir) {
//               isLastDir = fileIndex == fileArr.length - 1;
//               return fileDisplay(filedir).then(arr => {
//                 if (fileIndex == fileArr.length - 1) {
//                   console.log(fileIndex);
//                   resolve(arr);
//                 }
//               });
//             }
//             /* Only if fileList contains dir
//              and the dir is the last item of the list(isLastDir == true)
//              promise can resolve
//           */
//             if (fileIndex == fileArr.length - 1 && isLastDir) {
//               resolve(arr);
//             }
//           });
//         });
//       });
//     });
//   };
//   fileDisplay(path.join(__dirname + "./../"))
//     .then(arr => {
//       console.log(arr);
//     })
//     .catch(err => console.log(err));
// }
// const entities = fileDisplaySync(path.join(__dirname + "./../"));
// console.log(entities);

// Typeorm's entities loader seems not work
// This two functions below is example to list models files
fileDisplay(path.join(__dirname + "./../models/")).then(arr =>
  console.log(arr)
);
fileDisplaySync(path.join(__dirname + "./../models/"));

export const getDatabaseType = () => {
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
        entities: [__dirname + "./../models/*{.js,.ts}"], // fileDisplaySync(path.join(__dirname + "./../models/")),
        migrations: [__dirname + "./../migrations/*{.js,.ts}"],
        subscribers: []
      });
    case "mysql":
      return new DataSource({
        type: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: "root",
        password: "pwd",
        database: "data", // database name
        synchronize: false,
        logging: true,
        /*
          Document shortcut: https://typeorm.io/entities
          it's reflection of the structure of database table
        */
        entities: [__dirname + "./../models/*{.js,.ts}"],
        /*
          Generate migrations at enevy changes of entities
        */
        migrations: [__dirname + "./../migrations/*{.js,.ts}"],
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
      let entities = "";
      for (const key in connection.entityMetadatas) {
        entities += `${key.toString()} : ${
          connection.entityMetadatas[key].name
        }`;
        entities += "\t";
      }
      Logger.info(`
        Entitys registered successfully:
        ${entities}
        Data Source has been initialized!
      `);
    })
    .catch(err => {
      Logger.error("Error during Data Source initialization:", err);
    });
};
