// system.config.js

/**
 * Bootstrap/configure SystemJS (a dynamic module loader). Normally this file 
 * would be included "manually" with a <script> tag in index.html, for example.
 * For more info see https://github.com/systemjs/systemjs.
 * @type {Boolean}
 */
System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system",
      "es7.classProperties",
      "es7.decorators"
    ],
    "blacklist": []
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  buildCSS: true,
  separateCSS: true
});
