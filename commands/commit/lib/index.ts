import { bootstrap } from 'commitizen/dist/cli/git-cz';
import { commitizenCliPath, commitizenConfigPath } from './config';

class CommitCommand {
  exec() {
    bootstrap({
      cliPath: commitizenCliPath,
      config: {
        path: commitizenConfigPath,
      },
    });
  }
}

export default CommitCommand;
