import { normalizeAngle, safeDecimals } from "../calc/math"
import { getWindDriftSign } from "./wind"

/**
 * Calculates the Cape Verde from the surface route considering wind drift and directions.
 *
 * @param surfaceRoute - The initial surface route in degrees.
 * @param windDrift - The wind drift value.
 * @param windDirection - The direction of the wind in degrees.
 * @param boatDirection - The direction of the boat in degrees.
 * @returns The calculated Cape Verde from the surface route.
 *
 * @example
 * ```typescript
 * const surfaceRoute = 45;
 * const windDrift = 10;
 * const windDirection = 90;
 * const trueCape = calculateTrueCapeFromSurfaceRoute(surfaceRoute, windDrift, windDirection);
 * console.log(trueCape); // Output will depend on the implementation of getWindDriftSign
 * ```
 */
export function calculateTrueCapeFromSurfaceRoute(
  surfaceRoute: number, // degrees
  windDrift: number,
  windDirection: number // degrees
): number {
  return normalizeAngle(
    safeDecimals(
      surfaceRoute - getWindDriftSign(windDirection, surfaceRoute) * windDrift
    )
  )
}

/**
 * Calculates the Cape Verde from the given Cape Compass and variation.
 *
 * @param capeCompass - The initial compass heading in degrees.
 * @param variation - The variation to be added to the compass heading in degrees.
 * @returns The calculated Cape Verde heading in degrees.
 *
 * @example
 * ```typescript
 * const capeCompass = 100;
 * const variation = 10;
 * const trueCape = calculateTrueCapeFromCapeCompass(capeCompass, variation);
 * console.log(trueCape); // 110
 * ```
 */
export function calculateTrueCapeFromCapeCompass(
  capeCompass: number,
  variation: number
): number {
  return normalizeAngle(safeDecimals(capeCompass + variation))
}

/**
 * Calculates the compass heading by adjusting the given capVerde heading with the variation.
 *
 * @param capVerde - The initial heading in degrees.
 * @param variation - The variation to adjust the heading by in degrees.
 * @returns The adjusted compass heading in degrees.
 *
 * @example
 * ```typescript
 * const heading = calculateCapeCompass(120, 5);
 * console.log(heading); // 115
 * ```
 */
export function calculateCapeCompass(
  capVerde: number,
  variation: number
): number {
  return normalizeAngle(safeDecimals(capVerde - variation))
}

/**
 * Calculates the compass variation for a route by summing the declination and deviation.
 *
 * @param declinaison - The magnetic declination, which is the angle between magnetic north and true north.
 * @param deviation - The route compass deviation, which is the error of the compass due to local magnetic fields.
 * @returns The total compass variation.
 *
 * @example
 * ```typescript
 * const declinaison = 5; // Example declination in degrees
 * const deviation = 2; // Example deviation in degrees
 * const variation = calculateRouteCompassVariation(declinaison, deviation);
 * console.log(variation); // Output: 7
 * ```
 */
export function calculateRouteCompassVariation(
  declinaison: number,
  deviation: number
): number {
  return safeDecimals(declinaison + deviation)
}

/**
 * Calculates the bearing compass variation by summing the declination and deviation.
 *
 * @param declinaison - The magnetic declination, which is the angle between magnetic north and true north.
 * @param deviation - The bearing compass deviation, which is the error of the compass due to local magnetic fields.
 * @returns The bearing compass variation as a number.
 *
 * @example
 * ```typescript
 * const declinaison = 5; // example declination in degrees
 * const deviation = 2; // example deviation in degrees
 * const variation = calculateBearingCompassVariation(declinaison, deviation);
 * console.log(variation); // Output: 7
 * ```
 */
export function calculateBearingCompassVariation(
  declinaison: number,
  deviation: number
): number {
  return safeDecimals(declinaison + deviation)
}

/**
 * Calculates the magnetic declination for a given year based on the initial declination and the annual change in declination.
 *
 * @param declinaison - The initial magnetic declination in degrees.
 * @param annualDeclinaisonDelta - The annual change in magnetic declination in degrees.
 * @param startYear - The year when the initial declination was recorded.
 * @param currentYear - The year for which the magnetic declination is to be calculated. Defaults to the current year.
 * @returns The calculated magnetic declination for the given year.
 * @throws Will throw an error if the current year is less than the start year.
 *
 * @example
 * ```typescript
 * const initialDeclination = 10; // degrees
 * const annualChange = 0.1; // degrees per year
 * const startYear = 2000;
 * const currentYear = 2023;
 *
 * const declination = calculateDeclinaison(initialDeclination, annualChange, startYear, currentYear);
 * console.log(declination); // Output will be the calculated declination for the year 2023
 * ```
 */
export function calculateDeclinaison(
  declinaison: number,
  annualDeclinaisonDelta: number,
  startYear: number,
  currentYear: number = new Date().getFullYear()
): number {
  if (currentYear < startYear) {
    throw new Error("The current year must be greater than the initial year")
  }

  const newDeclinaisonInDegrees =
    (Math.trunc(declinaison) * 0.6 +
      (declinaison - Math.trunc(declinaison)) +
      annualDeclinaisonDelta * (currentYear - startYear)) /
    0.6
  const degrees = Math.trunc(newDeclinaisonInDegrees)
  const degreesSign = degrees < 0 || Object.is(degrees, -0) ? -1 : 1
  const minutes = Math.abs((newDeclinaisonInDegrees - degrees) * 0.6)

  return safeDecimals(degreesSign * (Math.abs(degrees) + Math.abs(minutes)))
}
