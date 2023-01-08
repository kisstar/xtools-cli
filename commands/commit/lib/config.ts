import { join } from 'path';

export const cwd = process.cwd();

export const commitizenCliPath = join(__dirname, '../node_modules/commitizen');

export const commitizenConfigPath = join(__dirname, '../dist/cz-commitlint.cjs');

export const commitlintCliPath = require(join(__dirname, '../node_modules/@commitlint/cli'));

export const commitlintConfigPath = join(__dirname, '../dist/commitlint.config.cjs');
