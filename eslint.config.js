import js from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                jest: true,
                node: true,
            },
        },
        plugins: {
            jest: jestPlugin,
        },
        rules: {
            "jest/no-disabled-tests": "warn",
            "jest/no-conditional-expect": "error",
            "jest/no-identical-title": "error",
        },
    },
];
