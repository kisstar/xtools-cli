import type { QualifiedRules, UserPromptConfig } from '@commitlint/types';

export type Commit = (message: string) => void;

export interface CommitlintConfig {
  rules: QualifiedRules;
  prompt: UserPromptConfig;
}
