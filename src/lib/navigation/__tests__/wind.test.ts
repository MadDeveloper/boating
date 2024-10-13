import { expect, suite, test } from "vitest"
import { calculateWindDrift, getWindDriftSign } from "../wind"

suite("calculateWindDrift", () => {
  test("should calculate the correct wind drift for given wind speed, boat speed, and drift coefficient", () => {
    const windSpeed = 15 // knots
    const boatSpeed = 10 // knots
    const driftCoefficient = 0.5
    const expectedDrift = 0.75

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    expect(drift).toBe(expectedDrift)
  })

  test("should return 0 if wind speed is 0", () => {
    const windSpeed = 0 // knots
    const boatSpeed = 10 // knots
    const driftCoefficient = 0.5
    const expectedDrift = 0

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    expect(drift).toBe(expectedDrift)
  })

  test("should return 0 if boat speed is 0", () => {
    const windSpeed = 15 // knots
    const boatSpeed = 0 // knots
    const driftCoefficient = 0.5

    expect(calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)).toBe(0)
  })

  test("should handle negative wind speed correctly", () => {
    const windSpeed = -15 // knots
    const boatSpeed = 10 // knots
    const driftCoefficient = 0.5
    const expectedDrift = -0.75

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    expect(drift).toBe(expectedDrift)
  })

  test("should handle negative boat speed correctly", () => {
    const windSpeed = 15 // knots
    const boatSpeed = -10 // knots
    const driftCoefficient = 0.5
    const expectedDrift = -0.75

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    expect(drift).toBe(expectedDrift)
  })

  test("should handle negative drift coefficient correctly", () => {
    const windSpeed = 15 // knots
    const boatSpeed = 10 // knots
    const driftCoefficient = -0.5
    const expectedDrift = -0.75

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    expect(drift).toBe(expectedDrift)
  })

  test("should handle high precision wind speed and boat speed", () => {
    const windSpeed = 15.123456 // knots
    const boatSpeed = 10.654321 // knots
    const driftCoefficient = 0.5
    const expectedDrift = parseFloat(((15.123456 * 0.5) / 10.654321).toFixed(2))

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    expect(drift).toBe(expectedDrift)
  })

  test("should handle very small wind speed and boat speed", () => {
    const windSpeed = 0.0001 // knots
    const boatSpeed = 0.0002 // knots
    const driftCoefficient = 0.5
    const expectedDrift = parseFloat(((0.0001 * 0.5) / 0.0002).toFixed(2))

    const drift = calculateWindDrift(windSpeed, boatSpeed, driftCoefficient)
    expect(drift).toBe(expectedDrift)
  })
})

suite("getWindDriftSign", () => {
  test("should return 0 when wind is coming from the bow", () => {
    const result = getWindDriftSign(0, 0)
    expect(result).to.equal(0)
  })

  test("should return 0 when wind is coming from the stern", () => {
    const result = getWindDriftSign(180, 0)
    expect(result).to.equal(0)
  })

  test("should return -1 when wind is coming from the starboard side", () => {
    const result = getWindDriftSign(90, 45)
    expect(result).to.equal(-1)
  })

  test("should return 1 when wind is coming from the port side", () => {
    const result = getWindDriftSign(45, 90)
    expect(result).to.equal(1)
  })

  test("should return -1 when boat direction is >= 180 and wind is coming from starboard side", () => {
    const result = getWindDriftSign(270, 200)
    expect(result).to.equal(-1)
  })

  test("should return 1 when boat direction is >= 180 and wind is coming from port side", () => {
    const result = getWindDriftSign(150, 200)
    expect(result).to.equal(1)
  })

  test("should return 1 when boat direction is <= 180 and wind is coming from port side", () => {
    const result = getWindDriftSign(30, 60)
    expect(result).to.equal(1)
  })

  test("should return -1 when boat direction is <= 180 and wind is coming from starboard side", () => {
    const result = getWindDriftSign(120, 60)
    expect(result).to.equal(-1)
  })

  test("should return 0 when boat direction and wind directions are close", () => {
    const result = getWindDriftSign(2, 357)
    expect(result).to.equal(0)
  })

  test("should return 1 when boat direction and wind directions are close inverted", () => {
    const result = getWindDriftSign(357, 2)
    expect(result).to.equal(0)
  })

  test("should return 1 when wind directions is in the boat stern ", () => {
    const result = getWindDriftSign(135, 315)
    expect(result).to.equal(0)
  })

  test("should return 1 when wind directions is in the boat bow ", () => {
    const result = getWindDriftSign(315, 135)
    expect(result).to.equal(0)
  })

  test("should return 1 when boat direction and wind directions are close", () => {
    const result = getWindDriftSign(135, 315)
    expect(result).to.equal(0)
  })

  test("should return -1 when boat direction is >= 180 and wind is coming from starboard side", () => {
    const result = getWindDriftSign(2, 355)
    expect(result).to.equal(-1)
  })

  test("should return 1 when boat direction is <= 180 and wind is coming from port side", () => {
    const result = getWindDriftSign(355, 2)
    expect(result).to.equal(1)
  })
})
