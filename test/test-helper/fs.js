let { writeFile: origWriteFile } = require("fs");

function writeFile (...args) {
  return new Promise((resolve, reject) => {
    origWriteFile(...args, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { writeFile };
