module.exports = {
  timeout: 60000,
  require: [
    "ts-node/register",
    "reflect-metadata",
  ],
  "full-trace": true,
  bail: false,
  exit: true,
  spec: "packages/*/test/**/*.test.ts",

};
