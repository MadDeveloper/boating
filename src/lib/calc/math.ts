/**
 * Rounds a number to a safe number of decimal places.
 *
 * This function ensures that the number is rounded to 14 decimal places,
 * which is considered safe for most calculations to avoid floating-point precision issues.
 *
 * @param number - The number to be rounded.
 * @returns The number rounded to 14 decimal places.
 *
 * @example
 * ```typescript
 * const result = safeDecimals(3.141592653589793238);
 * console.log(result); // 3.14159265358979
 * ```
 */
export function safeDecimals(number: number): number {
  /**
   * @note 14 decimals supported
   */
  const factor = 100000000000000

  return Math.round(number * factor) / factor
}

/**
 * Adds a given value to an angle and normalizes the result to be within the range of 0 to 359 degrees.
 *
 * @param angle - The initial angle in degrees.
 * @param value - The value to add to the angle.
 * @returns The resulting angle normalized to the range of 0 to 359 degrees.
 *
 * @example
 * ```typescript
 * const result = addAngle(350, 20);
 * console.log(result); // 10
 * ```
 */
export function addAngle(angle: number, value: number): number {
  return (angle + value + 360) % 360
}

/**
 * Checks if the distance between two angles is close.
 *
 * This function calculates the absolute difference between two angles and checks if it's close.
 *
 * @param angle1 - The first angle in degrees.
 * @param angle2 - The second angle in degrees.
 * @returns `true` if the distance between the two angles is close, `false` otherwise.
 *
 * @example
 * ```typescript
 * const result = AreAnglesClose(10, 15);
 * console.log(result); // true
 * const result2 = AreAnglesClose(350, 355);
 * console.log(result2); // true
 * const result3 = AreAnglesClose(0, 5);
 * console.log(result3); // true
 * const result4 = AreAnglesClose(10, 20);
 * console.log(result4); // false
 * ```
 */
export function areAnglesClose(angle1: number, angle2: number): boolean {
  const distance = Math.abs(angle1 - angle2)

  return distance <= 5 || 360 - distance <= 5
}

/**
 * Normalizes an angle to the range [0, 360) or [-180, 180) if `allowNegative` is true.
 *
 * @param angle - The angle to normalize, in degrees.
 * @param allowNegative - If true, allows the angle to be in the range [-180, 180). Defaults to false.
 * @returns The normalized angle.
 *
 * @example
 * ```typescript
 * normalizeAngle(370); // returns 10
 * normalizeAngle(-30); // returns 330
 * normalizeAngle(370, true); // returns 10
 * normalizeAngle(-30, true); // returns -30
 * ```
 */
export function normalizeAngle(angle: number, allowNegative?: boolean): number {
  if (allowNegative) {
    return angle % 360
  }

  return ((angle % 360) + 360) % 360
}
