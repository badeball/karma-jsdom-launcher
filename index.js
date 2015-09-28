var jsdom = require("jsdom");

var jsdomBrowser = function (baseBrowserDecorator) {
  baseBrowserDecorator(this);

  this._start = function (url) {
    jsdom.env({
      url: url,
      features : {
        FetchExternalResources: ["script", "iframe"],
        ProcessExternalResources: ["script"]
      },
      created: function (error, window) {
        // Do nothing.
      }
    });
  };
};

jsdomBrowser.$inject = ["baseBrowserDecorator"];

module.exports = {
  "launcher:jsdom": ["type", jsdomBrowser]
};
