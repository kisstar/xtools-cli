export interface CommandInfo {
  command: string;
  description?: string;
  options: [flags: string, description?: string, defaultValue?: string | boolean | string[]][];
  action?: () => void;
}
