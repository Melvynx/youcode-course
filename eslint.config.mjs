import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import hooksPlugin from "eslint-plugin-react-hooks";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat();

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2021,
        project: "tsconfig.json",
        sourceType: "module",
      },
    },
  },
  // Typescript
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  // Tailwind
  ...tailwind.configs["flat/recommended"],
  // React
  ...fixupConfigRules(pluginReactConfig),
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  // NextJS
  {
    ignores: [".next/"],
  },
  ...fixupConfigRules(compat.extends("plugin:@next/next/core-web-vitals")),
  // Rules config
  {
    rules: {
      "@next/next/no-img-element": 0,
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/ban-types": 0,
      "@typescript-eslint/consistent-indexed-object-style": 0,
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/member-ordering": "error",
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/no-confusing-non-null-assertion": "error",
      "@typescript-eslint/no-dynamic-delete": "error",
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-unused-vars": [
        1,
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_|^err|^error",
          argsIgnorePattern: "^_|props|^_error",
        },
      ],
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/switch-exhaustiveness-check": 0,
      "@typescript-eslint/unified-signatures": "error",
      camelcase: 0,
      "default-case": "error",
      "linebreak-style": ["error", "unix"],
      "no-async-promise-executor": "error",
      "no-await-in-loop": "error",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-extra-semi": "error",
      "no-misleading-character-class": "error",
      "no-multi-assign": "error",
      "no-multi-str": "error",
      "no-nested-ternary": "error",
      "no-new": "error",
      "no-new-object": "error",
      "no-new-symbol": "error",
      "no-new-wrappers": "error",
      "no-obj-calls": "error",
      "no-path-concat": "error",
      "no-return-await": "error",
      "no-script-url": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-tabs": "error",
      "no-template-curly-in-string": "error",
      "no-this-before-super": "error",
      "no-unreachable-loop": "error",
      "prefer-numeric-literals": "error",
      "prefer-object-spread": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "react/no-unescaped-entities": 0,
      "react/no-unknown-property": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": 0,
      semi: ["error", "always"],
      "symbol-description": "error",
      "tailwindcss/no-custom-classname": 0,
    },
  },
  // Ignore files
  {
    ignores: [
      "*/**.js",
      "*.js",
      "zod",
      "*/**.mjs",
      "vitest.config.ts",
      "next-env.d.ts",
      ".next",
      ".react-email",
      ".vercel",
      ".vscode",
      "tailwind.config.js",
      "next.config.js",
      "eslint.config.mjs",
      "**/worker.js",
    ],
  },
];
