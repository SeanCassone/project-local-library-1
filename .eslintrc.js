module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "id-length": [ // turn on rule that checks length of variables
      "error", // trigger an error if a variable is less than min length
      {
        min: 2, // set minimum length to 2
        exceptions: ["_"], // used for packages, lodash and underscore
      },
    ],
  },
};
