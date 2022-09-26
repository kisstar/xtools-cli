declare module '@commitlint/config-conventional' {
  import type { QualifiedRules, UserPromptConfig } from '@commitlint/types';

  interface CommitlintConfig {
    rules: QualifiedRules;
    prompt: UserPromptConfig;
  }

  const config: CommitlintConfig;

  export = config;
}
