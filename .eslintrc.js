module.exports = {
  "parserOptions": {
      "ecmaVersion": 5,
      "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
    // override default options
    "no-floating-decimal": "error",

    // disable
    "no-cond-assign": "off",
    "no-sparse-arrays": "off"
  }
}
