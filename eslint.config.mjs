import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import love from 'eslint-config-love';
import globals from 'globals';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ['dist', 'templates', 'boilerplate']
  },
  {
    ...love,
    files: ['**/*.js', '**/*.ts']
  },
  ...compat.extends('plugin:prettier/recommended'),
  {
    languageOptions: {
      globals: {
        ...globals.node
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json'],
        warnOnUnsupportedTypeScriptVersion: false
      }
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'eslint-comments/require-description': 'off',
      'no-console': 'off',
      complexity: 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  }
];
