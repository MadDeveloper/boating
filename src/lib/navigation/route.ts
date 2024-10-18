import {
  calculateCoordinatesWhenApplyingForce,
  degreesToRadians,
  invertAngleAxis,
  normalizeAngle,
  radiansToDegrees,
  safeDecimals,
} from "../calc/math"
import {
  convertLatitudeDegreesToNauticalMiles,
  convertNauticalMilesToLatitudeDegrees,
} from "./geography"
import { getWindDriftSign } from "./wind"

/**
 * Calculates the surface route from the true cape considering wind drift and wind direction.
 *
 * @param trueCape - The true cape angle in degrees.
 * @param windDrift - The wind drift angle in degrees.
 * @param windDirection - The wind direction angle in degrees.
 * @returns The calculated surface route angle in degrees.
 *
 * @example
 * ```typescript
 * const trueCape = 45;
 * const windDrift = 10;
 * const windDirection = 90;
 * const surfaceRoute = calculateSurfaceRouteFromTrueCape(trueCape, windDrift, windDirection);
 * console.log(surfaceRoute); // Output will depend on the implementation of normalizeAngle, safeDecimals, and getWindDriftSign
 * ```
 */
export function calculateSurfaceRouteFromTrueCape(
  trueCape: number,
  windDrift: number,
  windDirection: number
): number {
  return normalizeAngle(
    safeDecimals(
      trueCape + getWindDriftSign(windDirection, trueCape) * windDrift
    )
  )
}

/**
 * Calculates the surface route considering the background route, current direction,
 * current strength, and surface speed.
 *
 * @param backgroundRoute - The initial route before considering the current, in degrees.
 * @param currentDirection - The current direction in degrees.
 * @param currentStrength - The strength of the current.
 * @param surfaceSpeed - The speed of the surface vessel.
 * @returns The calculated surface route.
 *
 * @example
 * ```typescript
 * const route = calculateSurfaceRoute(45, 10, 5, 20);
 * console.log(route); // Output will vary based on the input parameters
 * ```
 */
export function calculateSurfaceRoute(
  backgroundRoute: number,
  currentDirection: number,
  currentStrength: number,
  surfaceSpeed: number
): number {
  if (currentDirection === 0 || currentStrength === 0) {
    return backgroundRoute
  }

  if (surfaceSpeed === 0) {
    return currentDirection
  }

  // Using trigonometry with sinus rule to calculate the angle delta.
  // The angle delta is the angle between the background route and the surface route.
  // The whole calculation has been simplified as its maximum.
  const innerSurfaceRoute = radiansToDegrees(
    Math.asin(
      Math.sin(
        (currentStrength *
          Math.sin(degreesToRadians(backgroundRoute - currentDirection))) /
          surfaceSpeed
      )
    )
  )

  return parseFloat(
    normalizeAngle(innerSurfaceRoute + backgroundRoute).toFixed(1)
  )
}

/**
 * Calculates the background route based on the given surface route, surface speed,
 * current direction, and current strength.
 *
 * @param surfaceRoute - The route on the surface in degrees.
 * @param surfaceSpeed - The speed on the surface in knots.
 * @param currentDirection - The direction of the current in degrees.
 * @param currentStrength - The strength of the current in knots.
 * @returns The calculated background route as a number.
 *
 * @example
 * ```typescript
 * const route = calculateBackgroundRoute(45, 10, 90, 5);
 * console.log(route); // Output will be the calculated background route
 * ```
 */
export function calculateBackgroundRoute(params: {
  longitude: number
  latitude: number
  surfaceRoute: number
  surfaceSpeed: number
  currentDirection: number
  currentStrength: number
}): number {
  if (params.surfaceSpeed === 0 && params.currentStrength === 0) {
    return 0
  }

  if (params.surfaceSpeed === 0) {
    return params.currentDirection
  }

  if (params.currentDirection === 0) {
    return params.surfaceRoute
  }

  const positionAfterSurfaceRouteProjection =
    calculateCoordinatesWhenApplyingForce(
      params.longitude,
      params.latitude,
      convertNauticalMilesToLatitudeDegrees(params.surfaceSpeed),
      invertAngleAxis(params.surfaceRoute)
    )

  const positionAfterCurrentProjection = calculateCoordinatesWhenApplyingForce(
    positionAfterSurfaceRouteProjection.x,
    positionAfterSurfaceRouteProjection.y,
    convertNauticalMilesToLatitudeDegrees(params.currentStrength),
    invertAngleAxis(params.currentDirection)
  )

  const slope =
    (positionAfterCurrentProjection.y - params.latitude) /
    (positionAfterCurrentProjection.x - params.longitude)

  const backgroundRoute = normalizeAngle(
    parseFloat(
      safeDecimals(
        invertAngleAxis(radiansToDegrees(Math.atan(slope))) +
          // @todo: This is a workaround to fix the issue with the angle calculation.
          // Need to find a global mathematical solution.
          // We could use the initial cap formula to calculate the angle. (atan2)
          (positionAfterCurrentProjection.x < params.longitude ? 180 : 0)
      ).toFixed(1)
    )
  )

  // console.log({
  //   ...params,
  //   positionAfterSurfaceRouteProjection,
  //   positionAfterCurrentProjection,
  //   directorCoefficient,
  //   backgroundRoute,
  //   aa: ((radiansToDegrees(Math.atan(directorCoefficient)) % 180) - 180) % 180,
  //   a: normalizeAngle(backgroundRoute),
  //   b: invertAngleAxis(backgroundRoute),
  //   c: normalizeAngle(invertAngleAxis(backgroundRoute)),
  //   d: invertAngleAxis(normalizeAngle(backgroundRoute)),
  // })

  return parseFloat(backgroundRoute.toFixed(1))
}

/**
 * Calculates the background speed based on the given parameters.
 *
 * @param params - An object containing the following properties:
 * - `longitude` (number): The longitude of the current position.
 * - `latitude` (number): The latitude of the current position.
 * - `currentDirection` (number): The direction of the current in degrees.
 * - `currentStrength` (number): The strength of the current in nautic milles.
 * - `surfaceRoute` (number): The direction of the surface route in degrees.
 * - `surfaceSpeed` (number): The speed of the surface route in nautic milles.
 *
 * @returns The calculated background speed as a number.
 *
 * @example
 * ```typescript
 * const speed = calculateBackgroundSpeed({
 *   longitude: -73.935242,
 *   latitude: 40.730610,
 *   currentDirection: 90,
 *   currentStrength: 5,
 *   surfaceRoute: 180,
 *   surfaceSpeed: 10
 * });
 * console.log(speed); // Output: calculated speed
 * ```
 */
export function calculateBackgroundSpeed(params: {
  longitude: number
  latitude: number
  currentDirection: number
  currentStrength: number
  surfaceRoute: number
  surfaceSpeed: number
}): number {
  const positionAfterCurrentProjection = calculateCoordinatesWhenApplyingForce(
    params.longitude,
    params.latitude,
    convertNauticalMilesToLatitudeDegrees(params.currentStrength),
    invertAngleAxis(params.currentDirection)
  )
  const positionAfterSurfaceRouteProjection =
    calculateCoordinatesWhenApplyingForce(
      positionAfterCurrentProjection.x,
      positionAfterCurrentProjection.y,
      convertNauticalMilesToLatitudeDegrees(params.surfaceSpeed),
      invertAngleAxis(params.surfaceRoute)
    )
  const distanceInNauticMiles = convertLatitudeDegreesToNauticalMiles(
    Math.sqrt(
      (positionAfterSurfaceRouteProjection.x - params.longitude) ** 2 +
        (positionAfterSurfaceRouteProjection.y - params.latitude) ** 2
    )
  )

  return parseFloat(safeDecimals(distanceInNauticMiles).toFixed(2))
}

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
 * const trueCape = calculateTrueCape(surfaceRoute, windDrift, windDirection);
 * console.log(trueCape); // Output will depend on the implementation of getWindDriftSign
 * ```
 */
export function calculateTrueCape(
  surfaceRoute: number,
  windDrift: number,
  windDirection: number
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
 * Calculates the compass heading by adjusting the given trueCape heading with the variation.
 *
 * @param trueCape - The initial heading in degrees.
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
  trueCape: number,
  variation: number
): number {
  return normalizeAngle(safeDecimals(trueCape - variation))
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
 * @param annualDeclinaisonDelta - The annual change in magnetic declination in minutes.
 * @param startYear - The year when the initial declination was recorded.
 * @param currentYear - The year for which the magnetic declination is to be calculated. Defaults to the current year.
 * @returns The calculated magnetic declination for the given year.
 * @throws Will throw an error if the current year is less than the start year.
 *
 * @example
 * ```typescript
 * const initialDeclination = 10; // degrees
 * const annualChange = 1; // minutes per year
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

  // We then put back degrees and minutes together
  return parseFloat(
    safeDecimals(
      declinaison + (annualDeclinaisonDelta * (currentYear - startYear)) / 60
    ).toFixed(2)
  )
}
