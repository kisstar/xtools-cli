import load from '@commitlint/load';
import process from '@commitlint/cz-commitlint/lib/Process';
import { isEmpty } from '@xtools-cli/shared';
import commitlintConf from './commitlint.config';
import type Inquirer from 'inquirer';
import type { Commit } from '../types/cz-commitlint';

const { rules: defaultRules, prompt: defaultPrompt } = commitlintConf;

/**
 * Entry point for commitizen
 * @param inquirer instance passed by commitizen, unused
 * @param commit callback to execute with complete commit message
 * @returns {void}
 */
export function prompter(inquirer: typeof Inquirer, commit: Commit): void {
  load().then(({ rules, prompt }) => {
    const retRules = isEmpty(rules) ? defaultRules : rules;
    const retPrompt = isEmpty(prompt) ? defaultPrompt : prompt;

    process(retRules, retPrompt, inquirer).then(commit);
  });
}
