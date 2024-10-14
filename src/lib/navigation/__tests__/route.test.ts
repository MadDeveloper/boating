import { expect, suite, test } from "vitest"
import {
  calculateBearingCompassVariation,
  calculateDeclinaison,
  calculateRouteCompassVariation,
  calculateSurfaceRouteFromTrueCape,
  calculateTrueCapeFromCapeCompass,
  calculateTrueCapeFromSurfaceRoute,
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

suite("calculateTrueCapeFromSurfaceRoute", () => {
  test("should calculate the Cape Verde correctly with negative wind drift", () => {
    const surfaceRoute = 45
    const windDrift = 10
    const windDirection = 90

    const result = calculateTrueCapeFromSurfaceRoute(
      surfaceRoute,
      windDrift,
      windDirection
    )

    const expectedTrueCape = 55

    expect(result).toBe(expectedTrueCape)
  })

  test("should calculate the Cape Verde correctly with positive wind drift", () => {
    const surfaceRoute = 45
    const windDrift = 10
    const windDirection = 270

    const result = calculateTrueCapeFromSurfaceRoute(
      surfaceRoute,
      windDrift,
      windDirection
    )

    const expectedTrueCape = 35

    expect(result).toBe(expectedTrueCape)
  })

  test("should handle zero wind drift", () => {
    const surfaceRoute = 45
    const windDrift = 0
    const windDirection = 90

    const result = calculateTrueCapeFromSurfaceRoute(
      surfaceRoute,
      windDrift,
      windDirection
    )

    const expectedTrueCape = 45

    expect(result).toBe(expectedTrueCape)
  })

  test("should handle zero surface route", () => {
    const surfaceRoute = 0
    const windDrift = 10
    const windDirection = 90

    const result = calculateTrueCapeFromSurfaceRoute(
      surfaceRoute,
      windDrift,
      windDirection
    )

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
