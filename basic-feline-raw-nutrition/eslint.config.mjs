// @ts-check

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        files: ['**/*.ts', '**/*.tsx'],
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
                ...globals.jest,
                ...globals.browser,
            },
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-floating-promises': 'error',
            "@typescript-eslint/no-misused-promises": "error",
        },
    },
    {
        files: ['**/*.js', '**/*.mjs'],
        extends: [eslint.configs.recommended, eslintConfigPrettier],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
        },
    },
);
