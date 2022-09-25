import type { QualifiedRules, UserPromptConfig } from '@commitlint/types';

export interface CommitlintConfig {
  rules: QualifiedRules;
  prompt: UserPromptConfig;
}

interface CommitOptions {
  args?: string[];
  hookMode?: boolean;
}

export type Commit = (message: string, options?: CommitOptions) => void;
