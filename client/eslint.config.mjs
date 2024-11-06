import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        React: true, // Добавляем React в глобальные переменные
      },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Автоматически определяет версию React
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      // Отключаем правило необходимости импорта React
      'react/react-in-jsx-scope': 'off',
      // Дополнительные полезные правила для React с TypeScript
      'react/prop-types': 'off', // Отключаем prop-types в пользу TypeScript
      'react/require-default-props': 'off', // Отключаем для TypeScript
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.tsx', '.jsx'] },
      ],
      'react/jsx-props-no-spreading': 'off', // Разрешаем spread операторы
      'react/destructuring-assignment': 'warn',
      'react/jsx-key': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-unused-prop-types': 'warn',
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  prettier,
  {
    plugins: {
      prettier: pluginPrettier,
      react: pluginReact,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'warn',
        {
          name: 'react-redux',
          importNames: ['useSelector', 'useDispatch'],
          message:
            'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
        },
      ],
      // Дополнительные правила TypeScript
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import/prefer-default-export': 'off',
    },
  },
];
