declare module 'staged-git-files' {
  type FileStatus =
    | 'Added'
    | 'Copied'
    | 'Deleted'
    | 'Modified'
    | 'Renamed'
    | 'Type-Change'
    | 'Unmerged'
    | 'Unknown'
    | 'Broken';

  interface FileInfo {
    filename: string;
    status: FileStatus;
  }

  interface SGF {
    (): Promise<FileInfo[]>;
  }

  const sgf: SGF;

  export = sgf;
}
