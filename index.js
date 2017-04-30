var jsdom = require("jsdom");

var jsdomBrowser = function (baseBrowserDecorator, config) {
  baseBrowserDecorator(this);
  
  this.name = "jsdom";

  this._start = function (url) {
    var virtualConsole = null;

    if (jsdom.JSDOM) { // Indicate jsdom >= 10.0.0 and a new API
      if (config.redirectConsole) {
        virtualConsole = new jsdom.VirtualConsole().sendTo(console);
      }

      jsdom.JSDOM.fromURL(url, {
        resources: "usable",
        runScripts: "dangerously",
        virtualConsole: virtualConsole
      });
    } else {
      if (config.redirectConsole) {
        virtualConsole = jsdom.createVirtualConsole().sendTo(console);
      }

      jsdom.env({
        url: url,
        virtualConsole: virtualConsole,
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

jsdomBrowser.$inject = ["baseBrowserDecorator", "config.jsdomLauncher"];

module.exports = {
  "launcher:jsdom": ["type", jsdomBrowser]
};
