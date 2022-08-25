import { CommandInfo } from '../types';

export const COMMANDS: CommandInfo[] = [
  {
    command: 'init [projectName]',
    description: 'init project',
    options: [['-f, --force', 'force initialization of project']],
  },
];
