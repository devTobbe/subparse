import { ParseOptions } from "./parseOptions";

export type ParsePreset = "full" | "minimal" | "noLine" | "textOnly";

/**
 * Returns the parse options for the given preset.
 * @param {ParsePreset} preset - The preset option.
 * @returns {ParseOptions} - The corresponding parse options.
 */
export function fetchPreset(preset: ParsePreset): ParseOptions {
  switch (preset) {
    case "full":
      return {
        includeLine: true,
        includeStart: true,
        includeEnd: true,
        includeText: true,
      };
    case "minimal":
      return {
        includeLine: true,
        includeStart: false,
        includeEnd: false,
        includeText: true,
      };
    case "noLine":
      return {
        includeLine: false,
        includeStart: true,
        includeEnd: true,
        includeText: true,
      };
    case "textOnly":
      return {
        includeLine: false,
        includeStart: false,
        includeEnd: false,
        includeText: true,
      };
    default:
      return {
        includeLine: true,
        includeStart: true,
        includeEnd: true,
        includeText: true,
      };
  }
}
