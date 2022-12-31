import { join } from 'path';

export const cwd = process.cwd();

export const eslintConfig = join(__dirname, '../.eslintrc.cjs');

export const styleConfig = join(__dirname, '../stylelint.config.cjs');
