module.exports = {
    env: {
        es2021: true,
        node: true,
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'only-warn'],
    rules: {},
    overrides: [],
    ignorePatterns: ['dist/**/*'],
};
