it("should allow simple DOM manipulations", function () {
  var divEl = document.createElement("div");

  divEl.appendChild(document.createTextNode("foo bar"));

  if (divEl.textContent !== "foo bar") {
    throw new Error("Expected textContent to equal 'foo bar'");
  }
});
