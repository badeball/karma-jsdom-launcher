let { createKarmaTest, waitToExit, WriteableBuffer } = require("./test-helper");

describe("with redirectConsole: true", function () {
  it("should redirect console from jsdom to node", async function () {
    let process = await createKarmaTest({ redirectConsole: true }, function () {
      console.log("foo bar");
    });

    let writable = process.stdout.pipe(new WriteableBuffer());

    await waitToExit(process);

    if (writable.getContents().toString().indexOf("foo bar") === -1) {
      throw new Error("Expected stdout to contain 'foo bar'");
    }
  });
});

describe("with redirectConsole: false (default)", function () {
  it("should omit console output from jsdom", async function () {
    let process = await createKarmaTest({}, function () {
      console.log("foo bar");
    });

    let writable = process.stdout.pipe(new WriteableBuffer());

    await waitToExit(process);

    if (writable.getContents().toString().indexOf("foo bar") !== -1) {
      throw new Error("Expected stdout to not contain 'foo bar'");
    }
  });
});
