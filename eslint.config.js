// eslint.config.js
const expoConfig = require('eslint-config-expo/flat');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  // Базовая конфигурация Expo
  ...expoConfig,

  // Игнорируемые файлы
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'build/**',
      '.expo/**',
      '.expo-shared/**',
      'android/**',
      'ios/**',
      'coverage/**',
      '*.config.js',
      'metro.config.js',
      'babel.config.js',
    ],
  },

  // Основные правила
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Неиспользуемые переменные - предупреждение
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off', // Отключаем базовое правило

      // Console.log - предупреждение
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Множественные пустые строки - ошибка
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],

      // Максимальная длина строки
      'max-len': [
        'warn',
        {
          code: 130,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreComments: true,
        },
      ],

      // TypeScript any - предупреждение
      '@typescript-eslint/no-explicit-any': 'warn',

      // React правила
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Дополнительные правила
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // Prettier config должен быть последним
  prettierConfig,
];
