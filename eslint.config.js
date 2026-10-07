const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: [
            'node_modules/**',
            'coverage/**'
        ]
    },

    js.configs.recommended,

    {
        files: ['**/*.js'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: globals.node
        },

        rules: {
            'no-undef': 'error',

            'no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    caughtErrors: 'none'
                }
            ],

            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],
            'prefer-const': 'warn'
        }
    }
];