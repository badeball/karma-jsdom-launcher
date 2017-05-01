# karma-jsdom-launcher

> Launcher for [jsdom].

## Installation

```bash
npm install karma-jsdom-launcher --save-dev
```

*NOTE:* karma and jsdom are peerDependencies of this module. If you haven't install them, run

```bash
npm install karma-jsdom-launcher jsdom karma --save-dev
```

to install all your dependencies.

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['jsdom'],
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers jsdom
```

You can pass options directly to jsdom as shown below. See jsdom's own
documentation for all supported options.

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['jsdom'],

    jsdomLauncher: {
      jsdom: {
        userAgent: "foobar"
      }
    }
  });
};
```

## FAQ

### I am using Gulp and the test suite is not exiting

This occurs due to lingering event handlers and it is currently an unsolved
issue. Meanwhile you have to explicitly exit the process yourself. This can be
done by not passing a callback to Karma.Server or by invoking process.exit(),
as shown below.

```javascript
var gulp = require('gulp');
var Server = require('karma').Server;

gulp.task('test', function () {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }).start();
});
```

```javascript
var gulp = require('gulp');
var Server = require('karma').Server;

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function (exitCode) {
    done();
    process.exit(exitCode);
  }).start();
});
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
[jsdom]: https://github.com/tmpvar/jsdom
