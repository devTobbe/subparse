// Represents a single subtitle line entry.
export interface Caption {
  line?: number;
  start?: string;
  end?: string;
  text?: string;
}

// Options for subtitle parsing
export interface ParseOptions {
  includeLine?: boolean;
  includeStart?: boolean;
  includeEnd?: boolean;
  includeText?: boolean;
}
