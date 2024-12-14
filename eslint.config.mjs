import vue from "eslint-plugin-vue";
import vueTS from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },
  {
    name: "app/files-to-ignore",
    ignores: ["**/webroot/**"],
  },
  ...vue.configs["flat/recommended"],
  ...vueTS(),
  // ...tailwind.configs["flat/recommended"],
  {
    rules: {
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/no-extraneous-class": "off",
    },
  },
  skipFormatting,
];
