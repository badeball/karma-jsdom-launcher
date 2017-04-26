let { tmpdir } = require("os");

let { writeFile } = require("./fs");

let { join } = require("path");

let { randomBytes } = require("crypto");

let { exec, spawn } = require("./child_process");

function generateRandomFilePath () {
  return join(
    tmpdir(),
    randomBytes(20).toString("hex") + ".js");
}

async function createKarmaTest (launcherOptions, testFunction) {
  let tmpTestFile = generateRandomFilePath(),
      tmpConfigFile = generateRandomFilePath();

  let config = {
    files:         [tmpTestFile],
    frameworks:    ["mocha"],
    browsers:      ["jsdom"],
    singleRun:     true,
    jsdomLauncher: launcherOptions
  };

  await writeFile(tmpTestFile, `
    it("dummy description", ${testFunction.toString()});
  `);

  await writeFile(tmpConfigFile, `
    module.exports = function(config) {
      config.set(${JSON.stringify(config)});
    };
  `);

  var npmBinDirectory = (await exec("npm bin")).stdout.toString().replace(/\n$/, "");

  var karmaBinPath = join(npmBinDirectory, "karma");

  return spawn(karmaBinPath, ["start", tmpConfigFile]);
}

function waitToExit (process) {
  return new Promise(function (resolve, reject) {
    process.on("exit", function (code) {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("The Karma test errored. Run with COPY_KARMA=1 to see Karma's output."));
      }
    });
  });
}

module.exports = {
  createKarmaTest,
  waitToExit,
};
