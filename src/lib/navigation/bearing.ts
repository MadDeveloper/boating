import { normalizeAngle, safeDecimals } from "../calc/math"

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
  variation: number
): number {
  return normalizeAngle(safeDecimals(compassBearing + variation))
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
  instrumentalError: number
): number {
  return normalizeAngle(
    safeDecimals(observedRelativeBearing + instrumentalError)
  )
}
