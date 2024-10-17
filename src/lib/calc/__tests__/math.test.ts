/* eslint-disable no-loss-of-precision */
import { expect, suite, test } from "vitest"
import {
  addAngle,
  arcctg,
  areAnglesClose,
  calculateCoordinatesWhenApplyingForce,
  cot,
  degreesToRadians,
  invertAngleAxis,
  normalizeAngle,
  radiansToDegrees,
  safeDecimals,
} from "../math"

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

suite("degreesToRadians", () => {
  test("should convert 0 degrees to 0 radians", () => {
    const result = degreesToRadians(0)
    expect(result).toBe(0)
  })

  test("should convert 180 degrees to π radians", () => {
    const result = degreesToRadians(180)
    expect(result).toBe(Math.PI)
  })

  test("should convert 360 degrees to 2π radians", () => {
    const result = degreesToRadians(360)
    expect(result).toBe(2 * Math.PI)
  })

  test("should convert 90 degrees to π/2 radians", () => {
    const result = degreesToRadians(90)
    expect(result).toBe(Math.PI / 2)
  })

  test("should convert -90 degrees to -π/2 radians", () => {
    const result = degreesToRadians(-90)
    expect(result).toBe(-Math.PI / 2)
  })

  test("should handle very small degree values", () => {
    const result = degreesToRadians(0.0001)
    expect(result).toBe(0.0001 * (Math.PI / 180))
  })

  test("should handle very large degree values", () => {
    const result = degreesToRadians(1000000)
    expect(result).toBe(1000000 * (Math.PI / 180))
  })
})

suite("radiansToDegrees", () => {
  test("should convert 0 radians to 0 degrees", () => {
    const result = radiansToDegrees(0)
    expect(result).toBeCloseTo(0, 10)
  })

  test("should convert π radians to 180 degrees", () => {
    const result = radiansToDegrees(Math.PI)
    expect(result).toBeCloseTo(180, 10)
  })

  test("should convert 2π radians to 360 degrees", () => {
    const result = radiansToDegrees(2 * Math.PI)
    expect(result).toBeCloseTo(360, 10)
  })

  test("should convert π/2 radians to 90 degrees", () => {
    const result = radiansToDegrees(Math.PI / 2)
    expect(result).toBeCloseTo(90, 10)
  })

  test("should convert -π/2 radians to -90 degrees", () => {
    const result = radiansToDegrees(-Math.PI / 2)
    expect(result).toBeCloseTo(-90, 10)
  })

  test("should handle very small radian values", () => {
    const result = radiansToDegrees(0.0001)
    expect(result).toBeCloseTo(0.0001 * (180 / Math.PI), 10)
  })

  test("should handle very large radian values", () => {
    const result = radiansToDegrees(1000000)
    expect(result).toBeCloseTo(1000000 * (180 / Math.PI), 10)
  })
})

suite("cot", () => {
  test("should calculate cotangent of 0 radians", () => {
    const result = cot(0)
    expect(result).toBe(Infinity)
  })

  test("should calculate cotangent of π/4 radians", () => {
    const result = cot(Math.PI / 4)
    expect(result).toBeCloseTo(1, 10)
  })

  test("should calculate cotangent of π/2 radians", () => {
    const result = cot(Math.PI / 2)
    expect(result).toBeCloseTo(0, 10)
  })

  test("should calculate cotangent of -π/4 radians", () => {
    const result = cot(-Math.PI / 4)
    expect(result).toBeCloseTo(-1, 10)
  })

  test("should handle very small radian values", () => {
    const result = cot(0.0001)
    expect(result).toBeCloseTo(1 / Math.tan(0.0001), 10)
  })

  test("should handle very large radian values", () => {
    const result = cot(1000000)
    expect(result).toBeCloseTo(1 / Math.tan(1000000), 10)
  })
})

suite("invertAngleAxis", () => {
  test("should convert 0 degrees to 90 degrees", () => {
    const result = invertAngleAxis(0)
    expect(result).toBe(90)
  })

  test("should convert 90 degrees to 0 degrees", () => {
    const result = invertAngleAxis(90)
    expect(result).toBe(0)
  })

  test("should convert 180 degrees to -90 degrees", () => {
    const result = invertAngleAxis(180)
    expect(result).toBe(-90)
  })

  test("should convert -90 degrees to 180 degrees", () => {
    const result = invertAngleAxis(-90)
    expect(result).toBe(180)
  })

  test("should handle angles greater than 90 degrees", () => {
    const result = invertAngleAxis(120)
    expect(result).toBe(-30)
  })

  test("should handle negative angles", () => {
    const result = invertAngleAxis(-45)
    expect(result).toBe(135)
  })

  test("should handle angles greater than 360 degrees", () => {
    const result = invertAngleAxis(450)
    expect(result).toBe(-360)
  })

  test("should handle very large angles", () => {
    const result = invertAngleAxis(1000)
    expect(result).toBe(-910)
  })

  test("should handle very small angles", () => {
    const result = invertAngleAxis(0.0001)
    expect(result).toBeCloseTo(89.9999, 10)
  })
})

suite("calculateCoordinatesWhenApplyingForce", () => {
  test("should calculate new coordinates when force is applied at 0 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 0)
    expect(result).toEqual({ x: 10, y: 0 })
  })

  test("should calculate new coordinates when force is applied at 90 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 90)
    expect(result).toEqual({ x: 0, y: 10 })
  })

  test("should calculate new coordinates when force is applied at 180 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 180)
    expect(result).toEqual({ x: -10, y: 0 })
  })

  test("should calculate new coordinates when force is applied at 270 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 270)
    expect(result).toEqual({ x: -0, y: -10 })
  })

  test("should calculate new coordinates when force is applied at 45 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 45)
    expect(result).toEqual({ x: 7.07106781186548, y: 7.07106781186548 })
  })

  test("should calculate new coordinates when initial coordinates are not zero", () => {
    const result = calculateCoordinatesWhenApplyingForce(5, 5, 10, 45)
    expect(result).toEqual({ x: 12.07106781186548, y: 12.07106781186548 })
  })

  test("should handle negative force values", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, -10, 45)
    expect(result).toEqual({ x: -7.07106781186547, y: -7.07106781186547 })
  })

  test("should handle negative initial coordinates", () => {
    const result = calculateCoordinatesWhenApplyingForce(-5, -5, 10, 45)
    expect(result).toEqual({ x: 2.07106781186548, y: 2.07106781186547 })
  })
})

suite("arcctg", () => {
  test("should calculate arc-cotangent of 1", () => {
    const result = arcctg(1)
    expect(result).toBeCloseTo(Math.PI / 4, 10)
  })

  test("should calculate arc-cotangent of 0", () => {
    const result = arcctg(0)
    expect(result).toBeCloseTo(Math.PI / 2, 10)
  })

  test("should calculate arc-cotangent of -1", () => {
    const result = arcctg(-1)
    expect(result).toBeCloseTo((3 * Math.PI) / 4, 10)
  })

  test("should handle very small values", () => {
    const result = arcctg(0.0001)
    expect(result).toBeCloseTo(Math.PI / 2 - Math.atan(0.0001), 10)
  })

  test("should handle very large values", () => {
    const result = arcctg(1000000)
    expect(result).toBeCloseTo(Math.PI / 2 - Math.atan(1000000), 10)
  })
})
