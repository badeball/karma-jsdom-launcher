module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],

    browsers: ["jsdom"],

    files: [
     "*-test.js"
    ],

    singleRun: true
  });
};
