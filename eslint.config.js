const js = require("@eslint/js");
const jestPlugin = require("eslint-plugin-jest");

module.exports = [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        ignores: ["node_modules/**"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                require: true,
                module: true,
                __dirname: true,
                console: true,
                process: true,
                describe: true,
                test: true,
                it: true,
                expect: true,
                beforeEach: true,
                afterEach: true,
                jest: true,
            },
        },
        plugins: {
            jest: jestPlugin,
        },
        rules: {
            "jest/no-disabled-tests": "warn",
            "jest/no-conditional-expect": "error",
            "jest/no-identical-title": "error",
            "no-undef": "off",
        },
    },
];
