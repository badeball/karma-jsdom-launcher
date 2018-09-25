let { createKarmaTest, waitToExit, WriteableBuffer } = require("./test-helper");

let { execSync } = require("child_process");

let { ResourceLoader } = require("jsdom");

describe("with jsdom: { … }", function () {

  /*
   * The configuration option tested here was only properly introduced
   * in jsdom-8.0.2 and isn't available in previous versions. I wish
   * there was an easier to test for this condition.
   *
   */
  let jsdomMajorVersion = parseInt(execSync("npm ls | grep -o -P '(?<=jsdom@)[0-9]+'"), 10);

  let it = jsdomMajorVersion > 7 ? global.it : global.it.skip;

  it("should pass options to jsdom", async function () {
    let jsdomOptions = {};

    if (jsdomMajorVersion < 12) {
      jsdomOptions.userAgent = "foobar";
    } else {
      jsdomOptions.resources = new ResourceLoader({
        userAgent: "foobar",
      });
    }

    await createKarmaTest({ jsdom: jsdomOptions }, function () {
      if (navigator.userAgent !== "foobar") {
        throw new Error("Expected userAgent to equal 'foobar'");
      }
    });
  });
});
