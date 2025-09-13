let { createKarmaTest, jsdomMajorVersion } = require("./test-helper");

let { ResourceLoader } = require("jsdom");

describe("with jsdom: { … }", function () {
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
