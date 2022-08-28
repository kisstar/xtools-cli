import path from 'path';
import { bootstrap } from 'commitizen/dist/cli/git-cz';

class CommitCommand {
  exec() {
    bootstrap({
      cliPath: path.join(__dirname, '../node_modules/commitizen'),
      config: {
        path: path.join(__dirname, '../dist/cz-commitlint.cjs'),
      },
    });
  }
}

export default CommitCommand;
