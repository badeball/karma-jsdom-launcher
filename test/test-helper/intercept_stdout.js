let intercept = require("intercept-stdout");

async function interceptStdout (options, fn) {
  let unhook = intercept(function (data) {
    if (options.passthrough) {
      return data;
    }

    return '';
  });

  let result = await fn();

  unhook();

  return result;
}

module.exports = { interceptStdout };
