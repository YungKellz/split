module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'flowtype',
    'jsx-a11y',
    'prettier',
  ],
  ignorePatterns: ['**/*.d.ts', '**/*.stories.mdx', '**/*.stories.tsx'],
  globals: {
    NodeJS: true,
    JSX: true,
    // Нужно для type Nullable из react-app-env
    Nullable: true,
    NodeListOf: true,
    jexcel: true,
  },
  // TODO: добавить правило  @typescript-eslint/naming-convention
  rules: {
    // TODO: Включить правило (когда уйдут старые новые модули!) и исправить все дупликаты переменных, интерфейсов, типов и т.д.
    'no-shadow': 'off',
    'no-debugger': 'warn',
    'no-console': 'error',
    'no-redeclare': 'off',
    'no-nested-ternary': 'off',
    'linebreak-style': [0, 'windows'],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    // TODO: Включить и деструктурировать в будущем
    'react/destructuring-assignment': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['#region', '#endregion'],
        },
      },
    ],
  },
};
