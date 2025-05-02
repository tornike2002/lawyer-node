module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recomended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recomended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn"],
    "prettier/prettier": ["error"],
  },
};
