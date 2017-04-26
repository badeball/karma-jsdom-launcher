var jsdom = require("jsdom");

var jsdomBrowser = function (baseBrowserDecorator) {
  baseBrowserDecorator(this);
  
  this.name = "jsdom";

  this._start = function (url) {
    if (jsdom.JSDOM) { // Indicate jsdom >= 10.0.0 and a new API
      jsdom.JSDOM.fromURL(url, {
        resources: "usable",
        runScripts: "dangerously"
      });
    } else {
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
    }
  };
};

jsdomBrowser.$inject = ["baseBrowserDecorator"];

module.exports = {
  "launcher:jsdom": ["type", jsdomBrowser]
};
