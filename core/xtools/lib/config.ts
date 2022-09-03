import CommitCommand from '@xtools-cli/commit';
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
];
