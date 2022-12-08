import fs from "fs";
import path from "path";

export const fileDisplaySync = (filePath, arr = []) => {
  try {
    const files = fs.readdirSync(filePath);
    files.forEach(filename => {
      const filedir = path.join(filePath, filename);
      const stats = fs.statSync(filedir);
      const isFile = stats.isFile();
      const isDir = stats.isDirectory();
      if (isFile) {
        arr.push(filedir);
      }
      if (isDir) {
        fileDisplaySync(filedir, arr);
      }
    });
    return arr;
  } catch (ex) {
    console.error(ex);
  }
};
/*
  this function is an asynchronous version of file recursion

  suggestion to understand how this function works
  set a log breakpoint to this line:
  `return fileDisplay(filedir, arr, fileCount, fileTot).then.....`
  and the end condition judgement for recursion of if statement:
  `
    if (fileCount == fileTot) {
      resolve(arr);
    }
  `
*/
export const fileDisplay = (
  filePath: string,
  // recursion var
  arr = [],
  fileCount = 0,
  fileTot = 0
) => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, function (err, files) {
      if (err) {
        console.error("ReadDir Error:");
        reject(err);
      }
      fileTot += files.length;
      files.forEach(filename => {
        const filedir = path.join(filePath, filename);
        fs.stat(filedir, (error, stats) => {
          if (error) {
            console.error("Read FileStat Error:");
            reject(error);
          }
          const isFile = stats.isFile();
          const isDir = stats.isDirectory();
          if (isFile) {
            fileCount += 1;
            /* 
              this log is out of order 
              because the function is asynchronous
              console.log(fileCount, fileTot, filedir);
            */
            arr.push(filedir);
          }
          if (isDir) {
            fileCount += 1;
            return fileDisplay(filedir, arr, fileCount, fileTot).then(arr => {
              /*
                  Making recursion a promise chain
                  Because this resolve is different from another resolve
                  4 lines behind it.Think why.
                  Answer is this resolve is belong to 
                  the previous promise.Another is belong to
                  this promise,so that it make recursion a promise chain
              */
              resolve(arr);
            });
          }
          /*
              The end condition judgement for recursion
          */
          if (fileCount == fileTot) {
            resolve(arr);
          }
        });
      });
    });
  });
};
