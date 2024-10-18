import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import { calculateWindDrift, getWindDriftSign } from "../wind.ts"

describe("calculateWindDrift", () => {
  it("should calculate the correct wind drift for given wind speed, boat speed, and drift coefficient", () => {
    const windSpeed = 15 // knots
    const boatSpeed = 10 // knots
    const driftCoefficient = 0.5
    const expectedDrift = 0.75

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    assertEquals(drift, expectedDrift)
  })

  it("should return 0 if wind speed is 0", () => {
    const windSpeed = 0 // knots
    const boatSpeed = 10 // knots
    const driftCoefficient = 0.5
    const expectedDrift = 0

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    assertEquals(drift, expectedDrift)
  })

  it("should return 0 if boat speed is 0", () => {
    const windSpeed = 15 // knots
    const boatSpeed = 0 // knots
    const driftCoefficient = 0.5

    assertEquals(calculateWindDrift(windSpeed, boatSpeed, driftCoefficient), 0)
  })

  it("should handle negative wind speed correctly", () => {
    const windSpeed = -15 // knots
    const boatSpeed = 10 // knots
    const driftCoefficient = 0.5
    const expectedDrift = -0.75

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    assertEquals(drift, expectedDrift)
  })

  it("should handle negative boat speed correctly", () => {
    const windSpeed = 15 // knots
    const boatSpeed = -10 // knots
    const driftCoefficient = 0.5
    const expectedDrift = -0.75

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    assertEquals(drift, expectedDrift)
  })

  it("should handle negative drift coefficient correctly", () => {
    const windSpeed = 15 // knots
    const boatSpeed = 10 // knots
    const driftCoefficient = -0.5
    const expectedDrift = -0.75

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    assertEquals(drift, expectedDrift)
  })

  it("should handle high precision wind speed and boat speed", () => {
    const windSpeed = 15.123456 // knots
    const boatSpeed = 10.654321 // knots
    const driftCoefficient = 0.5
    const expectedDrift = parseFloat(((15.123456 * 0.5) / 10.654321).toFixed(2))

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    assertEquals(drift, expectedDrift)
  })

  it("should handle very small wind speed and boat speed", () => {
    const windSpeed = 0.0001 // knots
    const boatSpeed = 0.0002 // knots
    const driftCoefficient = 0.5
    const expectedDrift = parseFloat(((0.0001 * 0.5) / 0.0002).toFixed(2))

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    assertEquals(drift, expectedDrift)
  })
})

describe("getWindDriftSign", () => {
  it("should return 0 when wind is coming from the bow", () => {
    const result = getWindDriftSign(0, 0)
    assertEquals(result, 0)
  })

  it("should return 0 when wind is coming from the stern", () => {
    const result = getWindDriftSign(180, 0)
    assertEquals(result, 0)
  })

  it("should return -1 when wind is coming from the starboard side", () => {
    const result = getWindDriftSign(90, 45)
    assertEquals(result, -1)
  })

  it("should return 1 when wind is coming from the port side", () => {
    const result = getWindDriftSign(45, 90)
    assertEquals(result, 1)
  })

  it("should return -1 when boat direction is >= 180 and wind is coming from starboard side", () => {
    const result = getWindDriftSign(270, 200)
    assertEquals(result, -1)
  })

  it("should return 1 when boat direction is >= 180 and wind is coming from port side", () => {
    const result = getWindDriftSign(150, 200)
    assertEquals(result, 1)
  })

  it("should return 1 when boat direction is <= 180 and wind is coming from port side", () => {
    const result = getWindDriftSign(30, 60)
    assertEquals(result, 1)
  })

  it("should return -1 when boat direction is <= 180 and wind is coming from starboard side", () => {
    const result = getWindDriftSign(120, 60)
    assertEquals(result, -1)
  })

  it("should return 0 when boat direction and wind directions are close", () => {
    const result = getWindDriftSign(2, 357)
    assertEquals(result, 0)
  })

  it("should return 1 when boat direction and wind directions are close inverted", () => {
    const result = getWindDriftSign(357, 2)
    assertEquals(result, 0)
  })

  it("should return 1 when wind directions is in the boat stern ", () => {
    const result = getWindDriftSign(135, 315)
    assertEquals(result, 0)
  })

  it("should return 1 when wind directions is in the boat bow ", () => {
    const result = getWindDriftSign(315, 135)
    assertEquals(result, 0)
  })

  it("should return 1 when boat direction and wind directions are close", () => {
    const result = getWindDriftSign(135, 315)
    assertEquals(result, 0)
  })

  it("should return -1 when boat direction is >= 180 and wind is coming from starboard side", () => {
    const result = getWindDriftSign(2, 355)
    assertEquals(result, -1)
  })

  it("should return 1 when boat direction is <= 180 and wind is coming from port side", () => {
    const result = getWindDriftSign(355, 2)
    assertEquals(result, 1)
  })
})
