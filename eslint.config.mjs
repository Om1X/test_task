// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    files: ['**/*.{ts,js,vue}'],
    rules: {
        'semi': ['error', 'always'],
        'import/order': ['warn', {
            groups: [
                'builtin', 'external', 'internal',
                ['parent', 'sibling', 'index'],
                'object', 'type'
            ],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true }
        }],
        'import/no-default-export': 'off', // если любишь default — оставь off
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-unused-vars': 'off', // передаём TS-версии
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'prefer-const': 'warn',
        'eqeqeq': ['error', 'always', { null: 'ignore' }],
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message: 'Используй Object.keys/values/entries вместо for..in'
            }
        ],
        'object-curly-spacing': ['error', 'always'],
    },
})
