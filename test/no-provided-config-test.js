let { createKarmaTest, waitToExit } = require("./test-helper");

describe("with jsdomLauncher: null", function () {
  it("should exit well", async () => {
    let process = await createKarmaTest(null, () => {
      // This test is simply expected to exit well.
    });

    await waitToExit(process);
  });
});
