# karma-jsdom-launcher

> Launcher for [jsdom].

## Installation

The easiest way is to keep `karma-jsdom-launcher` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "karma": "~0.13.10",
    "karma-jsdom-launcher": "~2.0.0"
  }
}
```

You can simple do it by:
```bash
npm install karma-jsdom-launcher --save-dev
```

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
