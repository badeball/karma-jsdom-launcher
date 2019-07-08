let { createKarmaTest } = require("./test-helper");

describe("with jsdomLauncher: null", function () {
  it("should exit well", async () => {
    await createKarmaTest(null, () => {
      // This test is simply expected to exit well.
    });
  });
});
