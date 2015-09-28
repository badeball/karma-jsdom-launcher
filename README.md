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

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
[jsdom]: https://github.com/tmpvar/jsdom
