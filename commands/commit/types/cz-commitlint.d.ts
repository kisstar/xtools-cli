interface CommitOptions {
  args?: string[];
  hookMode?: boolean;
}

export type Commit = (message: string, options?: CommitOptions) => void;
