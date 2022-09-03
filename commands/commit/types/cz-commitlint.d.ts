import type { QualifiedRules, UserPromptConfig } from '@commitlint/types';

interface CommitOptions {
  args?: string[];
  hookMode?: boolean;
}

export type Commit = (message: string, options?: CommitOptions) => void;

export interface CommitlintConfig {
  rules: QualifiedRules;
  prompt: UserPromptConfig;
}
