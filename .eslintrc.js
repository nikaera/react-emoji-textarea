module.exports = {
  root: true,
  env: {
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json",
  },
  plugins: ["react", "react-app", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  rules: {},
  overrides: [
    {
      files: ["src/**/*.tsx", ".eslintrc.js"],
    },
  ],
};
