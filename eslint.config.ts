import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginAstro from 'eslint-plugin-astro';
import tailwind from "eslint-plugin-tailwindcss";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  ...tailwind.configs["flat/recommended"],
  ...eslintPluginAstro.configs.recommended,
]);
