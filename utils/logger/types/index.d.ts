type CustomLevel = 'debug' | 'info' | 'warn' | 'error';

export type Level = 'silly' | CustomLevel | 'silent';

export interface LevelInfo {
  name: CustomLevel;
  level: number;
  style: {
    fg: string;
    bg: string;
  };
  disp: string;
}

export interface Logger {
  blankLine: () => void;
  setLevel: (level: Level) => void;
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}
