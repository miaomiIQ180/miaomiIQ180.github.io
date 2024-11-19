import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import pluginCasePolice from "eslint-plugin-case-police";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/strongly-recommended"],
  ...vueTsEslintConfig(),
  {
    "name": "vue/overrides",
    "rules": {
      "vue/multi-word-component-names": "off",
      "vue/no-console": "error",
      "vue/max-attributes-per-line": ["warn", {
        "singleline": 3,
        "multiline": 1,
      }],
      "vue/singleline-html-element-content-newline": "off",
    },
  },
  ...pluginVueA11y.configs["flat/recommended"],
  {
    name: "vuejs-accessibility:overrides",
    rules: {
      "vuejs-accessibility/media-has-caption": "warn",
      "vuejs-accessibility/no-aria-hidden-on-focusable": "error",
      "vuejs-accessibility/no-autofocus": "warn",
      "vuejs-accessibility/tabindex-no-positive ": "warn",
    },
  },
  pluginCasePolice.configs.recommended,
  {
    "name": "custom",
    "rules": {
      "curly": ["error", "multi-line", "consistent"],
      "dot-notation": "error",
      "max-nested-callbacks": ["warn", { "max": 4 }],
      "no-console": "off",
      "no-undef": ["error", { "typeof": true }],
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "error",
      "no-inline-comments": "off",
      "no-lonely-if": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "no-undef-init": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "varsIgnorePattern": "^props$" }],
      "yoda": ["error", "never", { "exceptRange": true }],
    },
  },
  stylistic.configs.customize({
    braceStyle: "1tbs",
    quoteProps: "consistent",
    quotes: "double",
    semi: true,
  }),
  {
    "name": "@stylistic/overrides",
    "rules": {
      "@stylistic/member-delimiter-style": ["error", {
        "multiline": {
          "delimiter": "comma",
          "requireLast": true,
        },
        "singleline": {
          "delimiter": "comma",
          "requireLast": false,
        },
        "multilineDetection": "brackets",
      }],
    },
  },
];
