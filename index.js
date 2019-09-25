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

  var self = this;
  
  this.name = "jsdom";

  this._start = function (url) {
    self.window = null;

    if (jsdom.JSDOM) { // Indicate jsdom >= 10.0.0 and a new API
      var virtualConsole = new jsdom.VirtualConsole();
      virtualConsole.sendTo(console);
      virtualConsole.removeAllListeners("clear");

      var jsdomOptions = {
        resources: "usable",
        runScripts: "dangerously",
        virtualConsole: virtualConsole
      };

      if (config && config.jsdom) {
        jsdomOptions = assign(jsdomOptions, config.jsdom);
      }

      jsdom.JSDOM.fromURL(url, jsdomOptions).then(function (dom) {
        self.window = dom.window;
      });
    } else {
      var jsdomOptions = {
        url: url,
        features : {
          FetchExternalResources: ["script", "iframe"],
          ProcessExternalResources: ["script"]
        },
        created: function (error, window) {
          self.window = window;
        }
      }

      if (config && config.jsdom) {
        jsdomOptions = assign(jsdomOptions, config.jsdom);
      }

      jsdom.env(jsdomOptions);
    }
  };

  this.on("kill", function (done) {
    self.window && self.window.close();
    self.emit("done");
    process.nextTick(done);
  });
};

jsdomBrowser.$inject = ["baseBrowserDecorator", "config.jsdomLauncher"];

module.exports = {
  "launcher:jsdom": ["type", jsdomBrowser]
};
