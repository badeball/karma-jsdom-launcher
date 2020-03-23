let { COPY_KARMA } = process.env;

let { tmpdir } = require("os");

let { writeFile } = require("./fs");

let { join } = require("path");

let { randomBytes } = require("crypto");

let { interceptStdout } = require("./intercept_stdout");

let { Server } = require("karma");

let { jsdomMajorVersion } = require("./jsdom-version");

afterEach((done) => {
  setTimeout(done, jsdomMajorVersion >= 12 && jsdomMajorVersion <= 16 ? 2000 : 0);
});

function generateRandomFilePath () {
  return join(
    tmpdir(),
    randomBytes(20).toString("hex") + ".js");
}

async function createKarmaTest (launcherOptions, testFunction) {
  let tmpTestFile = generateRandomFilePath();

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

  await interceptStdout({ passthrough: COPY_KARMA === '1' }, function () {
    return new Promise((resolve, reject) => {
      new Server(config, function(exitCode) {
        if (exitCode === 0) {
          resolve();
        } else {
          reject(new Error("The Karma test errored. Run with COPY_KARMA=1 to see Karma's output."));
        }
      }).start();
    });
  });
}

module.exports = {
  createKarmaTest,
  jsdomMajorVersion
};
