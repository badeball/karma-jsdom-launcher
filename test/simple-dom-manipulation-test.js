let { createKarmaTest } = require("./test-helper");

it("should allow simple DOM manipulations", async () => {
  await createKarmaTest({}, () => {
    let divEl = document.createElement("div");

    divEl.appendChild(document.createTextNode("foo bar"));

    if (divEl.textContent !== "foo bar") {
      throw new Error("Expected textContent to equal 'foo bar'");
    }
  });
});
