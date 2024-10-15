import { expect, suite, test } from "vitest"
import {
  calculateBackgroundSpeed,
  calculateBearingCompassVariation,
  calculateDeclinaison,
  calculateRouteCompassVariation,
  calculateSurfaceRoute,
  calculateSurfaceRouteFromTrueCape,
  calculateTrueCape,
  calculateTrueCapeFromCapeCompass,
} from "../route"

suite("calculateDeclinaison", () => {
  test("should calculate the magnetic declination correctly for a specific year", () => {
    const declinaison = 10
    const annualDeclinaisonDelta = -0.08
    const startYear = 2000
    const currentYear = 2008

    const result = calculateDeclinaison(
      declinaison,
      annualDeclinaisonDelta,
      startYear,
      currentYear
    )

    const expectedDeclination = 8.56

    expect(result).toBe(expectedDeclination)
  })

  test("should throw an error if the current year is less than the start year", () => {
    const declinaison = 10
    const annualDeclinaisonDelta = 0.1
    const startYear = 2000
    const currentYear = 1999

    expect(() => {
      calculateDeclinaison(
        declinaison,
        annualDeclinaisonDelta,
        startYear,
        currentYear
      )
    }).toThrow("The current year must be greater than the initial year")
  })

  test("should handle zero annual declination delta", () => {
    const declinaison = 10
    const annualDeclinaisonDelta = 0
    const startYear = 2000
    const currentYear = 2023

    const result = calculateDeclinaison(
      declinaison,
      annualDeclinaisonDelta,
      startYear,
      currentYear
    )

    const expectedDeclination = declinaison

    expect(result).toBe(expectedDeclination)
  })

  test("should handle positive annual declination delta with negative declinaison", () => {
    const declinaison = -4.1
    const annualDeclinaisonDelta = 0.08
    const startYear = 2000
    const currentYear = 2024

    const result = calculateDeclinaison(
      declinaison,
      annualDeclinaisonDelta,
      startYear,
      currentYear
    )

    const expectedDeclination = -0.58

    expect(result).toBe(expectedDeclination)
  })

  test("should handle negative annual declination delta with negative declinaison", () => {
    const declinaison = -4.1
    const annualDeclinaisonDelta = -0.08
    const startYear = 2000
    const currentYear = 2014

    const result = calculateDeclinaison(
      declinaison,
      annualDeclinaisonDelta,
      startYear,
      currentYear
    )

    const expectedDeclination = -6.02

    expect(result).toBe(expectedDeclination)
  })

  test("should handle negative annual declination delta with positive declinaison", () => {
    const declinaison = 4.1
    const annualDeclinaisonDelta = -0.08
    const startYear = 2000
    const currentYear = 2024

    const result = calculateDeclinaison(
      declinaison,
      annualDeclinaisonDelta,
      startYear,
      currentYear
    )

    const expectedDeclination = 0.58

    expect(result).toBe(expectedDeclination)
  })
})

suite("calculateBearingCompassVariation", () => {
  test("should calculate the bearing compass variation correctly", () => {
    const declinaison = 5
    const deviation = 2

    const result = calculateBearingCompassVariation(declinaison, deviation)

    const expectedVariation = 7

    expect(result).toBe(expectedVariation)
  })

  test("should handle zero declinaison", () => {
    const declinaison = 0
    const deviation = 2

    const result = calculateBearingCompassVariation(declinaison, deviation)

    const expectedVariation = 2

    expect(result).toBe(expectedVariation)
  })

  test("should handle zero deviation", () => {
    const declinaison = 5
    const deviation = 0

    const result = calculateBearingCompassVariation(declinaison, deviation)

    const expectedVariation = 5

    expect(result).toBe(expectedVariation)
  })

  test("should handle negative declinaison", () => {
    const declinaison = -5
    const deviation = 2

    const result = calculateBearingCompassVariation(declinaison, deviation)

    const expectedVariation = -3

    expect(result).toBe(expectedVariation)
  })

  test("should handle negative deviation", () => {
    const declinaison = 5
    const deviation = -2

    const result = calculateBearingCompassVariation(declinaison, deviation)

    const expectedVariation = 3

    expect(result).toBe(expectedVariation)
  })

  test("should handle both negative declinaison and deviation", () => {
    const declinaison = -5
    const deviation = -2

    const result = calculateBearingCompassVariation(declinaison, deviation)

    const expectedVariation = -7

    expect(result).toBe(expectedVariation)
  })
})

suite("calculateRouteCompassVariation", () => {
  test("should calculate the route compass variation correctly", () => {
    const declinaison = 5
    const deviation = 3

    const result = calculateRouteCompassVariation(declinaison, deviation)

    const expectedVariation = 8

    expect(result).toBe(expectedVariation)
  })

  test("should handle zero declinaison", () => {
    const declinaison = 0
    const deviation = 3

    const result = calculateRouteCompassVariation(declinaison, deviation)

    const expectedVariation = 3

    expect(result).toBe(expectedVariation)
  })

  test("should handle zero deviation", () => {
    const declinaison = 5
    const deviation = 0

    const result = calculateRouteCompassVariation(declinaison, deviation)

    const expectedVariation = 5

    expect(result).toBe(expectedVariation)
  })

  test("should handle negative declinaison", () => {
    const declinaison = -5
    const deviation = 3

    const result = calculateRouteCompassVariation(declinaison, deviation)

    const expectedVariation = -2

    expect(result).toBe(expectedVariation)
  })

  test("should handle negative deviation", () => {
    const declinaison = 5
    const deviation = -3

    const result = calculateRouteCompassVariation(declinaison, deviation)

    const expectedVariation = 2

    expect(result).toBe(expectedVariation)
  })

  test("should handle both negative declinaison and deviation", () => {
    const declinaison = -5
    const deviation = -3

    const result = calculateRouteCompassVariation(declinaison, deviation)

    const expectedVariation = -8

    expect(result).toBe(expectedVariation)
  })
})

suite("calculateTrueCapeFromCapeCompass", () => {
  test("should calculate the Cape Verde correctly with positive variation", () => {
    const capeCompass = 100
    const variation = 10

    const result = calculateTrueCapeFromCapeCompass(capeCompass, variation)

    const expectedTrueCape = 110

    expect(result).toBe(expectedTrueCape)
  })

  test("should calculate the Cape Verde correctly with negative variation", () => {
    const capeCompass = 100
    const variation = -10

    const result = calculateTrueCapeFromCapeCompass(capeCompass, variation)

    const expectedTrueCape = 90

    expect(result).toBe(expectedTrueCape)
  })

  test("should handle zero variation", () => {
    const capeCompass = 100
    const variation = 0

    const result = calculateTrueCapeFromCapeCompass(capeCompass, variation)

    const expectedTrueCape = 100

    expect(result).toBe(expectedTrueCape)
  })
})

suite("calculateTrueCape", () => {
  test("should calculate the Cape Verde correctly with negative wind drift", () => {
    const surfaceRoute = 45
    const windDrift = 10
    const windDirection = 90

    const result = calculateTrueCape(surfaceRoute, windDrift, windDirection)

    const expectedTrueCape = 55

    expect(result).toBe(expectedTrueCape)
  })

  test("should calculate the Cape Verde correctly with positive wind drift", () => {
    const surfaceRoute = 45
    const windDrift = 10
    const windDirection = 270

    const result = calculateTrueCape(surfaceRoute, windDrift, windDirection)

    const expectedTrueCape = 35

    expect(result).toBe(expectedTrueCape)
  })

  test("should handle zero wind drift", () => {
    const surfaceRoute = 45
    const windDrift = 0
    const windDirection = 90

    const result = calculateTrueCape(surfaceRoute, windDrift, windDirection)

    const expectedTrueCape = 45

    expect(result).toBe(expectedTrueCape)
  })

  test("should handle zero surface route", () => {
    const surfaceRoute = 0
    const windDrift = 10
    const windDirection = 90

    const result = calculateTrueCape(surfaceRoute, windDrift, windDirection)

    const expectedTrueCape = 10

    expect(result).toBe(expectedTrueCape)
  })
})

suite("calculateSurfaceRouteFromTrueCape", () => {
  test("should calculate the surface route correctly with positive wind drift", () => {
    const trueCape = 45
    const windDrift = 10
    const windDirection = 90

    const result = calculateSurfaceRouteFromTrueCape(
      trueCape,
      windDrift,
      windDirection
    )

    const expectedSurfaceRoute = 35

    expect(result).toBe(expectedSurfaceRoute)
  })

  test("should calculate the surface route correctly with negative wind drift", () => {
    const trueCape = 45
    const windDrift = 10
    const windDirection = 270

    const result = calculateSurfaceRouteFromTrueCape(
      trueCape,
      windDrift,
      windDirection
    )

    const expectedSurfaceRoute = 55

    expect(result).toBe(expectedSurfaceRoute)
  })

  test("should handle zero wind drift", () => {
    const trueCape = 45
    const windDrift = 0
    const windDirection = 90

    const result = calculateSurfaceRouteFromTrueCape(
      trueCape,
      windDrift,
      windDirection
    )

    const expectedSurfaceRoute = 45

    expect(result).toBe(expectedSurfaceRoute)
  })

  test("should handle zero true cape", () => {
    const trueCape = 0
    const windDrift = 10
    const windDirection = 90

    const result = calculateSurfaceRouteFromTrueCape(
      trueCape,
      windDrift,
      windDirection
    )

    const expectedSurfaceRoute = 350

    expect(result).toBe(expectedSurfaceRoute)
  })

  test("should normalize the surface route angle correctly", () => {
    const trueCape = 355
    const windDrift = 10
    const windDirection = 270

    const result = calculateSurfaceRouteFromTrueCape(
      trueCape,
      windDrift,
      windDirection
    )

    const expectedSurfaceRoute = 5

    expect(result).toBe(expectedSurfaceRoute)
  })
})

suite("calculateSurfaceRoute", () => {
  test("should calculate the surface route correctly with current drift", () => {
    const backgroundRoute = 186
    const currentDirection = 160
    const currentStrength = 0.9
    const surfaceSpeed = 5

    const result = calculateSurfaceRoute(
      backgroundRoute,
      currentDirection,
      currentStrength,
      surfaceSpeed
    )

    const expectedSurfaceRoute = 190.5

    expect(result).toBe(expectedSurfaceRoute)
  })

  test("should calculate the surface route correctly with current drift - second test", () => {
    const backgroundRoute = 302
    const currentDirection = 200
    const currentStrength = 0.8
    const surfaceSpeed = 5

    const result = calculateSurfaceRoute(
      backgroundRoute,
      currentDirection,
      currentStrength,
      surfaceSpeed
    )

    const expectedSurfaceRoute = 311

    expect(result).toBe(expectedSurfaceRoute)
  })

  test("should calculate the surface route correctly with zero current drift", () => {
    const backgroundRoute = 45
    const currentDirection = 0
    const currentStrength = 5
    const surfaceSpeed = 20

    const result = calculateSurfaceRoute(
      backgroundRoute,
      currentDirection,
      currentStrength,
      surfaceSpeed
    )

    const expectedSurfaceRoute = 45

    expect(result).toBe(expectedSurfaceRoute)
  })

  test("should calculate the surface route correctly with zero current strength", () => {
    const backgroundRoute = 45
    const currentDirection = 10
    const currentStrength = 0
    const surfaceSpeed = 20

    const result = calculateSurfaceRoute(
      backgroundRoute,
      currentDirection,
      currentStrength,
      surfaceSpeed
    )

    const expectedSurfaceRoute = 45

    expect(result).toBe(expectedSurfaceRoute)
  })

  test("should calculate the surface route correctly with zero surface speed", () => {
    const backgroundRoute = 45
    const currentDirection = 10
    const currentStrength = 5
    const surfaceSpeed = 0

    const result = calculateSurfaceRoute(
      backgroundRoute,
      currentDirection,
      currentStrength,
      surfaceSpeed
    )

    const expectedSurfaceRoute = 10

    expect(result).toBe(expectedSurfaceRoute)
  })
})

suite("calculateBackgroundSpeed", () => {
  test("should calculate the background speed correctly", () => {
    const params = {
      longitude: -2.92,
      latitude: 47.5036666667,
      currentDirection: 155,
      currentStrength: 1.5,
      surfaceRoute: 147,
      surfaceSpeed: 2.5,
    }

    const result = calculateBackgroundSpeed(params)

    const expectedSpeed = 3.99

    expect(result).toBe(expectedSpeed)
  })

  test("should calculate the background speed correctly - second test", () => {
    const params = {
      longitude: -3.05583333333,
      latitude: 47.5191666667,
      currentDirection: 120,
      currentStrength: 1.4,
      surfaceRoute: 144,
      surfaceSpeed: 4.2,
    }

    const result = calculateBackgroundSpeed(params)

    const expectedSpeed = 5.51

    expect(result).toBe(expectedSpeed)
  })

  test("should handle zero current strength", () => {
    const params = {
      longitude: -73.935242,
      latitude: 40.73061,
      currentDirection: 90,
      currentStrength: 0,
      surfaceRoute: 180,
      surfaceSpeed: 10,
    }

    const result = calculateBackgroundSpeed(params)

    const expectedSpeed = 10 // Only surface speed should be considered

    expect(result).toBeCloseTo(expectedSpeed, 1)
  })

  test("should handle zero surface speed", () => {
    const params = {
      longitude: -73.935242,
      latitude: 40.73061,
      currentDirection: 90,
      currentStrength: 5,
      surfaceRoute: 180,
      surfaceSpeed: 0,
    }

    const result = calculateBackgroundSpeed(params)

    const expectedSpeed = 5 // Only current strength should be considered

    expect(result).toBeCloseTo(expectedSpeed, 1)
  })

  test("should handle zero current strength and zero surface speed", () => {
    const params = {
      longitude: -73.935242,
      latitude: 40.73061,
      currentDirection: 90,
      currentStrength: 0,
      surfaceRoute: 180,
      surfaceSpeed: 0,
    }

    const result = calculateBackgroundSpeed(params)

    const expectedSpeed = 0 // Both speeds are zero

    expect(result).toBeCloseTo(expectedSpeed, 1)
  })
})
