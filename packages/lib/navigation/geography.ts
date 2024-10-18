/**
 * Enum representing the four cardinal directions.
 *
 * @enum {string}
 * @property {string} North - Represents the north direction.
 * @property {string} South - Represents the south direction.
 * @property {string} East - Represents the east direction.
 * @property {string} West - Represents the west direction.
 */
export enum GeographyDirection {
  North = "north",
  South = "south",
  East = "east",
  West = "west",
}

/**
 * Converts a distance in nautical miles to degrees of latitude.
 *
 * @param nauticalMiles - The distance in nautical miles to be converted.
 * @returns The equivalent distance in degrees of latitude.
 *
 * @example
 * ```typescript
 * const degrees = convertNauticalMilesToLatitudeDegrees(120);
 * console.log(degrees); // Output: 2
 * ```
 */
export function convertNauticalMilesToLatitudeDegrees(
  nauticalMiles: number
): number {
  return nauticalMiles / 60
}

/**
 * Converts latitude degrees to nautical miles.
 *
 * @param degrees - The number of degrees of latitude to convert.
 * @returns The equivalent distance in nautical miles.
 *
 * @example
 * ```typescript
 * const nauticalMiles = convertLatitudeDegreesToNauticalMiles(1);
 * console.log(nauticalMiles); // 60
 * ```
 */
export function convertLatitudeDegreesToNauticalMiles(degrees: number): number {
  return degrees * 60
}
