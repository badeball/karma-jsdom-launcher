let intercept = require("intercept-stdout");

async function interceptStdout (options, fn) {
  let unhook = intercept(function (data) {
    if (options.passthrough) {
      return data;
    }

    return '';
  });


  try {
    return await fn();
  } finally {
    unhook();
  }
}

module.exports = { interceptStdout };
