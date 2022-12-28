import load from '@commitlint/load';
import { default as czCcommitlintProcess } from '@commitlint/cz-commitlint/lib/Process';
import { isEmpty } from '@xtools-cli/shared';
import commitlintConf from './commitlint.config';
import type { Commit } from '../types/cz-commitlint';

const { rules: defaultRules, prompt: defaultPrompt } = commitlintConf;

type Inquirer = Parameters<typeof czCcommitlintProcess>[2];

/**
 * Entry point for commitizen
 * @param inquirer instance passed by commitizen, unused
 * @param commit callback to execute with complete commit message
 * @returns {void}
 */
export function prompter(inquirer: Inquirer, commit: Commit): void {
  load().then(({ rules, prompt }) => {
    const retRules = isEmpty(rules) ? defaultRules : rules;
    const retPrompt = isEmpty(prompt) ? defaultPrompt : prompt;

    czCcommitlintProcess(retRules, retPrompt, inquirer).then((template) => {
      // Get cli args
      const rawGitArgs = process.argv.slice(3);

      commit(template, { args: rawGitArgs });
    });
  });
}
