import { addAngle, areAnglesClose, safeDecimals } from "../calc/math"

/**
 * Calculates the wind drift based on the wind speed, boat speed, and a drift coefficient.
 *
 * @param windSpeed - The speed of the wind in knots.
 * @param boatSpeed - The speed of the boat in knots.
 * @param driftCoefficient - The coefficient that represents the effect of wind on the boat's drift.
 * @returns The calculated wind drift.
 *
 * @example
 * ```typescript
 * const windSpeed = 15; // knots
 * const boatSpeed = 10; // knots
 * const driftCoefficient = 0.5;
 * const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient);
 * console.log(drift); // Output: 0.75
 * ```
 */
export function calculateWindDrift(
  windSpeed: number,
  boatSpeed: number,
  driftCoefficient: number
): number {
  if (boatSpeed === 0) {
    return 0
  }

  return parseFloat(
    safeDecimals((windSpeed * driftCoefficient) / boatSpeed).toFixed(2)
  )
}

/**
 * Determines the sign of the wind drift based on the wind direction and boat direction.
 *
 * @param windDirection - The direction from which the wind is coming, in degrees (0-360).
 * @param boatDirection - The direction in which the boat is heading, in degrees (0-360).
 * @returns A number indicating the wind drift sign:
 * - `0` if the wind is coming from the bow or the stern.
 * - `-1` if the wind is coming from the starboard side.
 * - `1` if the wind is coming from the port side.
 *
 * @example
 * ```typescript
 * const windDriftSign = getWindDriftSign(90, 45);
 * console.log(windDriftSign); // Output: -1
 * ```
 */
export function getWindDriftSign(
  windDirection: number,
  boatDirection: number
): number {
  if (
    areAnglesClose(windDirection, boatDirection) ||
    areAnglesClose(windDirection, addAngle(boatDirection, -180))
  ) {
    // Wind is coming from the bow or the stern
    return 0
  }

  if (boatDirection >= 180) {
    if (windDirection > boatDirection || windDirection <= boatDirection - 180) {
      return -1
    }

    return 1
  }

  // boatDirection is <= 180
  return windDirection < boatDirection || windDirection >= boatDirection + 180
    ? 1
    : -1
}
