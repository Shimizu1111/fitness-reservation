
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.next/**',
    ],
  },
  // JavaScript の推奨設定
  js.configs.recommended,
  {
    // 対象ファイルの指定
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        // React のバージョンを自動検出
        version: 'detect',
        // 固定バージョンを指定
        // version: '19.0.0',
      },
    },
    rules: {
      // Prettier のルールを適用
      'prettier/prettier': 'error',

      // キャメルケースを強制
      camelcase: ['error', { properties: 'always' }],

      // TypeScript の命名規則
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variableLike', format: ['camelCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
      ],

      // React のルール
      'react/react-in-jsx-scope': 'off', // React 17+ では不要
      'react/no-array-index-key': 'off', // Turbopack 由来の警告を無視
    },
  },
];
