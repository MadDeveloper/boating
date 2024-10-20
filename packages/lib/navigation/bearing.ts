import { normalizeAngle, safeDecimals } from "../calc/math.ts"

/**
 * Calculates the true bearing by adjusting the observed bearing with the instrumental error.
 *
 * @param compassBearing - The compass bearing, in degrees.
 * @param variation - The bearing variation, in degrees.
 * @returns The true bearing, adjusted by variation, in degrees.
 *
 * @example
 * ```typescript
 * const trueBearing = calculateTrueBearing(350, 15);
 * console.log(trueBearing); // 5
 * ```
 */
export function calculateTrueBearing(
  compassBearing: number,
  variation: number,
): number {
  return normalizeAngle(safeDecimals(compassBearing + variation))
}

/**
 * Calculates the bearing from a given relative bearing and cape.
 *
 * This function takes a relative bearing and a cape (course angle) and returns
 * the normalized bearing. The result is ensured to have safe decimal precision.
 *
 * @param relativeBearing - The relative bearing in degrees.
 * @param cape - The cape (course angle) in degrees.
 * @returns The normalized bearing in degrees.
 *
 * @example
 * ```typescript
 * const bearing = calculateBearingFromRelativeBearing(45, 90);
 * console.log(bearing); // Output will depend on the implementation of normalizeAngle and safeDecimals
 * ```
 */
export function calculateBearingFromRelativeBearing(
  relativeBearing: number,
  cape: number,
): number {
  return normalizeAngle(safeDecimals(relativeBearing + cape))
}

/**
 * Calculates the true relative bearing by adjusting the observed relative bearing
 * with the instrumental error and normalizing the result.
 *
 * @param observedRelativeBearing - The observed relative bearing in degrees.
 * @param instrumentalError - The instrumental error in degrees.
 * @returns The true relative bearing in degrees, normalized to the range [0, 360).
 *
 * @example
 * ```typescript
 * const trueBearing = calculateTrueRelativeBearing(45, 5);
 * console.log(trueBearing); // Output will be the normalized true relative bearing
 * ```
 */
export function calculateTrueRelativeBearing(
  observedRelativeBearing: number,
  instrumentalError: number,
): number {
  return normalizeAngle(
    safeDecimals(observedRelativeBearing + instrumentalError),
  )
}
