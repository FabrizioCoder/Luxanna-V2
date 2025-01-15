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
            '@typescript-eslint/no-extraneous-class': 'off' // java devs
        }
    }
)