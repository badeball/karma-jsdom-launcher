var jsdom = require("jsdom");

function assign (destination, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }

  return destination;
}

var jsdomBrowser = function (baseBrowserDecorator, config) {
  baseBrowserDecorator(this);
  
  this.name = "jsdom";

  this._start = function (url) {
    if (jsdom.JSDOM) { // Indicate jsdom >= 10.0.0 and a new API
      var jsdomOptions = {
        resources: "usable",
        runScripts: "dangerously"
      };

      if (config && config.jsdom) {
        jsdomOptions = assign(jsdomOptions, config.jsdom);
      }

      jsdom.JSDOM.fromURL(url, jsdomOptions);
    } else {
      var jsdomOptions = {
        url: url,
        features : {
          FetchExternalResources: ["script", "iframe"],
          ProcessExternalResources: ["script"]
        },
        created: function (error, window) {
          // Do nothing.
        }
      }

      if (config && config.jsdom) {
        jsdomOptions = assign(jsdomOptions, config.jsdom);
      }

      jsdom.env(jsdomOptions);
    }
  };
};

jsdomBrowser.$inject = ["baseBrowserDecorator", "config.jsdomLauncher"];

module.exports = {
  "launcher:jsdom": ["type", jsdomBrowser]
};
