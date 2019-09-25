let { createKarmaTest } = require("./test-helper");

const createSpy = (object, property) => {
  const origFn = object[property];

  if (typeof origFn !== "function") {
    throw new Error("Attempting to spy a non-function");
  }

  const spy = {
    called: false,

    restore() {
      object[property] = origFn;
    }
  };

  object[property] = function () {
    spy.called = true;

    return origFn.apply(object, arguments);
  };

  return spy;
};

it("should not invoke console.clear", async () => {
  const spy = createSpy(console, "clear");

  try {
    await createKarmaTest(null, () => {
      // This test is simply expected to exit well.
    });

    if (spy.called) {
      throw new Error("Expected console.clear to never be called");
    }
  } finally {
    spy.restore();
  }
});

it("should not change native console's clear", async () => {
  const origClear = console.clear;

  await createKarmaTest(null, () => {
    // This test is simply expected to exit well.
  });

  if (console.clear !== origClear) {
    throw new Error("Expected console.clear to remain unchanged");
  }
});