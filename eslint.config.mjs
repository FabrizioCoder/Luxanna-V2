import theConfig from '@marcrock22/eslint';
import { config } from 'typescript-eslint';

export default config(
    theConfig,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
    },
    {
        ignores: [
            'dist/**/*.ts',
            'dist/**',
            '**/*.mjs',
            'eslint.config.mjs',
            '**/*.js',
            'src/types/riot-api.ts'
        ],
    },
    {
        rules: {
            '@typescript-eslint/no-extraneous-class': 'off', // java devs
            '@stylistic/comma-dangle': ['error', {
                "arrays": "always",
                "objects": "always",
                "imports": "always",
                "exports": "always",
                "functions": "never",
                "importAttributes": "always",
                "dynamicImports": "always"
            }]
        }
    }
)