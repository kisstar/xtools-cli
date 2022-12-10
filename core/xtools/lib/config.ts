import CommitCommand from '@xtools-cli/commit';
import LintCommand from '@xtools-cli/lint';
import { CommandInfo } from '../types';

export const COMMANDS: CommandInfo[] = [
  {
    command: 'init [projectName]',
    description: 'init project',
    options: [['-f, --force', 'force initialization of project']],
  },
  {
    command: 'commit',
    description: 'interactive submission and specification verification',
    action: new CommitCommand().exec,
  },
  {
    command: 'lint',
    description: 'verify the code with the specified rules',
    action: new LintCommand().exec,
  },
];
