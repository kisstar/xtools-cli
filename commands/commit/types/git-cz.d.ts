interface CzConfig {
  path: string;
}

interface Environment {
  cliPath?: string;
  config: CzConfig;
}

declare module 'commitizen/dist/cli/git-cz' {
  export function bootstrap(env: Environment): void;
}
