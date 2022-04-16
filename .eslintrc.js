module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module",
    "createDefaultProgram": true,
  },
  "plugins": [
    "@typescript-eslint",
    "@typescript-eslint/tslint"
  ],
  "ignorePatterns": [
    "node_modules/",
    "dist"
  ],
  "rules": {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/unbound-method": "warn",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/restrict-template-expressions": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-floating-promises": "error",

    "eqeqeq": [
      "error",
      "smart"
    ],
    "max-classes-per-file": [
      "error",
      1
    ],
    "max-len": "off",
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-console": "warn",
    "no-debugger": "error",
    "no-empty": "error",
    "no-eval": "error",
    "no-fallthrough": "off",
    "no-invalid-this": "off",
    "no-new-wrappers": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-unsafe-finally": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "object-shorthand": "error",
    "one-var": [
      "error",
      "never"
    ],
    "radix": "error",
    "spaced-comment": "error",
    "use-isnan": "error",
    "valid-typeof": "off",
    "@typescript-eslint/tslint/config": [
      "error",
      {
        "rules": {
          "jsdoc-format": true,
          "no-reference-import": true
        }
      }
    ],
  },
  "overrides": [{
    "files": ["*.test.ts"],
    "rules": {
      "@typescript-eslint/camelcase": "off"
    }
  }]
};
