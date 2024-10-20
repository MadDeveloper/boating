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

/**
 * Converts an angle from degrees to radians.
 *
 * @param degrees - The angle in degrees to be converted.
 * @returns The angle in radians.
 *
 * @example
 * ```typescript
 * const radians = degreesToRadians(180);
 * console.log(radians); // Output: 3.141592653589793
 * ```
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Converts an angle from radians to degrees.
 *
 * @param radians - The angle in radians to be converted.
 * @returns The angle in degrees.
 *
 * @example
 * ```typescript
 * const degrees = radiansToDegrees(Math.PI); // 180
 * ```
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI)
}

/**
 * Calculates the cotangent of a given angle in radians.
 *
 * @param {number} x - The angle in radians for which to calculate the cotangent.
 * @returns {number} The cotangent of the given angle.
 *
 * @example
 * ```typescript
 * const angle = Math.PI / 4;
 * const result = cot(angle);
 * console.log(result); // Output will be approximately 1
 * ```
 */
export function cot(x: number): number {
  return 1 / Math.tan(x)
}

/**
 * Calculates the arc-cotangent (inverse cotangent) of a number.
 *
 * @param x - The number to calculate the arc-cotangent for.
 * @returns The arc-cotangent of the given number in radians.
 *
 * @example
 * ```typescript
 * const result = arcctg(1);
 * console.log(result); // Output: 0.7853981633974483 (which is π/4)
 * ```
 */
export function arcctg(x: number) {
  return Math.PI / 2 - Math.atan(x)
}

/**
 * Calculates the new coordinates when a force is applied at a given angle.
 *
 * @param x - The initial x-coordinate.
 * @param y - The initial y-coordinate.
 * @param force - The magnitude of the force being applied.
 * @param angle - The angle at which the force is applied, in degrees.
 * @returns An object containing the new x and y coordinates.
 *
 * @example
 * ```typescript
 * const newCoordinates = calculateCoordinatesWhenApplyingForce(0, 0, 10, 45);
 * console.log(newCoordinates); // { x: 7.0710678118654755, y: 7.071067811865475 }
 * ```
 */
export function calculateCoordinatesWhenApplyingForce(
  x: number,
  y: number,
  force: number,
  angle: number,
): { x: number; y: number } {
  return {
    x: safeDecimals(x + force * Math.cos(degreesToRadians(angle))),
    y: safeDecimals(y + force * Math.sin(degreesToRadians(angle))),
  }
}

/**
 * Invert the angle axis.
 *
 * This function takes an angle and invert its axis.
 * The conversion is done by subtracting the given angle from 90 degrees.
 *
 * @param angle - The angle to be inverted.
 * @returns The inverted angle.
 *
 * @example
 * ```typescript
 * const angle = 30;
 * const invertedAngle = invertAngleAxis(angle);
 * console.log(invertedAngle); // Output: 60
 * ```
 */
export function invertAngleAxis(angle: number): number {
  return 90 - angle
}
