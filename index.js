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
    var virtualConsole = null;

    if (jsdom.JSDOM) { // Indicate jsdom >= 10.0.0 and a new API
      if (config.redirectConsole) {
        virtualConsole = new jsdom.VirtualConsole().sendTo(console);
      }

      var jsdomOptions = {
        resources: "usable",
        runScripts: "dangerously",
        virtualConsole: virtualConsole
      };

      if (config.jsdom) {
        jsdomOptions = assign(jsdomOptions, config.jsdom);
      }

      jsdom.JSDOM.fromURL(url, jsdomOptions);
    } else {
      if (config.redirectConsole) {
        virtualConsole = jsdom.createVirtualConsole().sendTo(console);
      }

      var jsdomOptions = {
        url: url,
        virtualConsole: virtualConsole,
        features : {
          FetchExternalResources: ["script", "iframe"],
          ProcessExternalResources: ["script"]
        },
        created: function (error, window) {
          // Do nothing.
        }
      }

      if (config.jsdom) {
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
