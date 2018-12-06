let { execSync } = require("child_process");

module.exports = {
  jsdomMajorVersion: parseInt(execSync("npm ls | grep -o -P '(?<=jsdom@)[0-9]+'"), 10)
};
