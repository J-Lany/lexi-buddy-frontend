import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },

  ...tseslint.configs.recommendedTypeChecked,

  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'package-lock.json',
      'jest.config.js',
    ],
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreVoid: true, ignoreIIFE: false },
      ],
    },
  },

  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
