/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  extends: "airbnb-base",
  parser: "babel-eslint",
  rules: {
    "no-console": "off",
    "prefer-template": "off",
    "no-param-reassign": "off"
  }
};