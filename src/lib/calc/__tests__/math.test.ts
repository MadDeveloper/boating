/* eslint-disable no-loss-of-precision */
import { expect, suite, test } from "vitest"
import { addAngle, areAnglesClose, normalizeAngle, safeDecimals } from "../math"

suite("safeDecimals", () => {
  test("should round to 14 decimal places", () => {
    const result = safeDecimals(3.141592653589793238)
    expect(result).toBeCloseTo(3.14159265358979, 14)
  })

  test("should handle numbers with fewer than 14 decimal places", () => {
    const result = safeDecimals(1.123456789)
    expect(result).toBeCloseTo(1.123456789, 14)
  })

  test("should handle whole numbers", () => {
    const result = safeDecimals(42)
    expect(result).toBe(42)
  })

  test("should handle very small numbers", () => {
    const result = safeDecimals(0.000000000000123456)
    expect(result).toBeCloseTo(0.00000000000012, 14)
  })

  test("should handle very large numbers", () => {
    const result = safeDecimals(123456789012345.67890123456789)
    expect(result).toBeCloseTo(123456789012345.68, 14)
  })

  test("should handle negative numbers", () => {
    const result = safeDecimals(-3.141592653589793238)
    expect(result).toBeCloseTo(-3.14159265358979, 14)
  })
})

suite("addAngle", () => {
  test("should add angle and value within 0 to 359 range", () => {
    const result = addAngle(350, 20)
    expect(result).toBe(10)
  })

  test("should handle adding zero", () => {
    const result = addAngle(45, 0)
    expect(result).toBe(45)
  })

  test("should handle values that result in exactly 360", () => {
    const result = addAngle(180, 180)
    expect(result).toBe(0)
  })

  test("should handle values greater than 360", () => {
    const result = addAngle(270, 200)
    expect(result).toBe(110)
  })
})

suite("areAnglesClose", () => {
  test("should return true when angles are within 5 degrees of each other", () => {
    const result = areAnglesClose(10, 15)
    expect(result).toBe(true)
  })

  test("should return true when angles are within 5 degrees of each other across 0 degrees", () => {
    const result = areAnglesClose(350, 355)
    expect(result).toBe(true)
  })

  test("should return true when angles are exactly 5 degrees apart", () => {
    const result = areAnglesClose(0, 5)
    expect(result).toBe(true)
  })

  test("should return false when angles are more than 5 degrees apart", () => {
    const result = areAnglesClose(10, 20)
    expect(result).toBe(false)
  })

  test("should return true when angles are the same", () => {
    const result = areAnglesClose(45, 45)
    expect(result).toBe(true)
  })

  test("should return true when angles are within 5 degrees of each other with negative angles", () => {
    const result = areAnglesClose(-5, 0)
    expect(result).toBe(true)
  })

  test("should return false when angles are more than 5 degrees apart with negative angles", () => {
    const result = areAnglesClose(-10, 0)
    expect(result).toBe(false)
  })

  test("should return true when angles are more than 5 degrees apart with the 360 limit", () => {
    const result = areAnglesClose(357, 2)
    expect(result).toBe(true)
  })

  test("should return true when angles are more than 5 degrees apart with the 360 limit inverted", () => {
    const result = areAnglesClose(2, 357)
    expect(result).toBe(true)
  })
})

suite("normalizeAngle", () => {
  test("should normalize angle to range [0, 360)", () => {
    const result = normalizeAngle(370)
    expect(result).toBe(10)
  })

  test("should normalize negative angle to range [0, 360)", () => {
    const result = normalizeAngle(-30)
    expect(result).toBe(330)
  })

  test("should normalize angle to range [-180, 180) when allowNegative is true", () => {
    const result = normalizeAngle(370, true)
    expect(result).toBe(10)
  })

  test("should normalize negative angle to range [-180, 180) when allowNegative is true", () => {
    const result = normalizeAngle(-30, true)
    expect(result).toBe(-30)
  })

  test("should handle angle exactly 360", () => {
    const result = normalizeAngle(360)
    expect(result).toBe(0)
  })

  test("should handle angle exactly -360", () => {
    const result = normalizeAngle(-360)
    expect(result).toBe(0)
  })

  test("should handle angle exactly 0", () => {
    const result = normalizeAngle(0)
    expect(result).toBe(0)
  })

  test("should handle angle exactly 180", () => {
    const result = normalizeAngle(180)
    expect(result).toBe(180)
  })

  test("should handle angle exactly -180", () => {
    const result = normalizeAngle(-180, true)
    expect(result).toBe(-180)
  })

  test("should handle large positive angles", () => {
    const result = normalizeAngle(1080)
    expect(result).toBe(0)
  })

  test("should handle large negative angles", () => {
    const result = normalizeAngle(-1080)
    expect(result).toBe(0)
  })

  test("should handle large positive angles with allowNegative", () => {
    const result = normalizeAngle(1080, true)
    expect(result).toBe(0)
  })

  test("should handle large negative angles with allowNegative", () => {
    const result = normalizeAngle(-1080, true)
    expect(result).toBe(-0)
  })
})
