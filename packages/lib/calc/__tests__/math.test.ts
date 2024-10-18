import { assertAlmostEquals, assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
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
} from "../math.ts"

describe("safeDecimals", () => {
  it("should round to 14 decimal places", () => {
    const result = safeDecimals(3.141592653589793238)
    assertAlmostEquals(result, 3.14159265358979, 14)
  })

  it("should handle numbers with fewer than 14 decimal places", () => {
    const result = safeDecimals(1.123456789)
    assertAlmostEquals(result, 1.123456789, 14)
  })

  it("should handle whole numbers", () => {
    const result = safeDecimals(42)
    assertEquals(result, 42)
  })

  it("should handle very small numbers", () => {
    const result = safeDecimals(0.000000000000123456)
    assertAlmostEquals(result, 0.00000000000012, 14)
  })

  it("should handle very large numbers", () => {
    const result = safeDecimals(123456789012345.67890123456789)
    assertAlmostEquals(result, 123456789012345.68, 14)
  })

  it("should handle negative numbers", () => {
    const result = safeDecimals(-3.141592653589793238)
    assertAlmostEquals(result, -3.14159265358979, 14)
  })
})

describe("addAngle", () => {
  it("should add angle and value within 0 to 359 range", () => {
    const result = addAngle(350, 20)
    assertEquals(result, 10)
  })

  it("should handle adding zero", () => {
    const result = addAngle(45, 0)
    assertEquals(result, 45)
  })

  it("should handle values that result in exactly 360", () => {
    const result = addAngle(180, 180)
    assertEquals(result, 0)
  })

  it("should handle values greater than 360", () => {
    const result = addAngle(270, 200)
    assertEquals(result, 110)
  })
})

describe("areAnglesClose", () => {
  it("should return true when angles are within 5 degrees of each other", () => {
    const result = areAnglesClose(10, 15)
    assertEquals(result, true)
  })

  it("should return true when angles are within 5 degrees of each other across 0 degrees", () => {
    const result = areAnglesClose(350, 355)
    assertEquals(result, true)
  })

  it("should return true when angles are exactly 5 degrees apart", () => {
    const result = areAnglesClose(0, 5)
    assertEquals(result, true)
  })

  it("should return false when angles are more than 5 degrees apart", () => {
    const result = areAnglesClose(10, 20)
    assertEquals(result, false)
  })

  it("should return true when angles are the same", () => {
    const result = areAnglesClose(45, 45)
    assertEquals(result, true)
  })

  it("should return true when angles are within 5 degrees of each other with negative angles", () => {
    const result = areAnglesClose(-5, 0)
    assertEquals(result, true)
  })

  it("should return false when angles are more than 5 degrees apart with negative angles", () => {
    const result = areAnglesClose(-10, 0)
    assertEquals(result, false)
  })

  it("should return true when angles are more than 5 degrees apart with the 360 limit", () => {
    const result = areAnglesClose(357, 2)
    assertEquals(result, true)
  })

  it("should return true when angles are more than 5 degrees apart with the 360 limit inverted", () => {
    const result = areAnglesClose(2, 357)
    assertEquals(result, true)
  })
})

describe("normalizeAngle", () => {
  it("should normalize angle to range [0, 360)", () => {
    const result = normalizeAngle(370)
    assertEquals(result, 10)
  })

  it("should normalize negative angle to range [0, 360)", () => {
    const result = normalizeAngle(-30)
    assertEquals(result, 330)
  })

  it("should normalize angle to range [-180, 180) when allowNegative is true", () => {
    const result = normalizeAngle(370, true)
    assertEquals(result, 10)
  })

  it("should normalize negative angle to range [-180, 180) when allowNegative is true", () => {
    const result = normalizeAngle(-30, true)
    assertEquals(result, -30)
  })

  it("should handle angle exactly 360", () => {
    const result = normalizeAngle(360)
    assertEquals(result, 0)
  })

  it("should handle angle exactly -360", () => {
    const result = normalizeAngle(-360)
    assertEquals(result, 0)
  })

  it("should handle angle exactly 0", () => {
    const result = normalizeAngle(0)
    assertEquals(result, 0)
  })

  it("should handle angle exactly 180", () => {
    const result = normalizeAngle(180)
    assertEquals(result, 180)
  })

  it("should handle angle exactly -180", () => {
    const result = normalizeAngle(-180, true)
    assertEquals(result, -180)
  })

  it("should handle large positive angles", () => {
    const result = normalizeAngle(1080)
    assertEquals(result, 0)
  })

  it("should handle large negative angles", () => {
    const result = normalizeAngle(-1080)
    assertEquals(result, 0)
  })

  it("should handle large positive angles with allowNegative", () => {
    const result = normalizeAngle(1080, true)
    assertEquals(result, 0)
  })

  it("should handle large negative angles with allowNegative", () => {
    const result = normalizeAngle(-1080, true)
    assertEquals(result, -0)
  })
})

describe("degreesToRadians", () => {
  it("should convert 0 degrees to 0 radians", () => {
    const result = degreesToRadians(0)
    assertEquals(result, 0)
  })

  it("should convert 180 degrees to π radians", () => {
    const result = degreesToRadians(180)
    assertEquals(result, Math.PI)
  })

  it("should convert 360 degrees to 2π radians", () => {
    const result = degreesToRadians(360)
    assertEquals(result, 2 * Math.PI)
  })

  it("should convert 90 degrees to π/2 radians", () => {
    const result = degreesToRadians(90)
    assertEquals(result, Math.PI / 2)
  })

  it("should convert -90 degrees to -π/2 radians", () => {
    const result = degreesToRadians(-90)
    assertEquals(result, -Math.PI / 2)
  })

  it("should handle very small degree values", () => {
    const result = degreesToRadians(0.0001)
    assertEquals(result, 0.0001 * (Math.PI / 180))
  })

  it("should handle very large degree values", () => {
    const result = degreesToRadians(1000000)
    assertEquals(result, 1000000 * (Math.PI / 180))
  })
})

describe("radiansToDegrees", () => {
  it("should convert 0 radians to 0 degrees", () => {
    const result = radiansToDegrees(0)
    assertAlmostEquals(result, 0, 10)
  })

  it("should convert π radians to 180 degrees", () => {
    const result = radiansToDegrees(Math.PI)
    assertAlmostEquals(result, 180, 10)
  })

  it("should convert 2π radians to 360 degrees", () => {
    const result = radiansToDegrees(2 * Math.PI)
    assertAlmostEquals(result, 360, 10)
  })

  it("should convert π/2 radians to 90 degrees", () => {
    const result = radiansToDegrees(Math.PI / 2)
    assertAlmostEquals(result, 90, 10)
  })

  it("should convert -π/2 radians to -90 degrees", () => {
    const result = radiansToDegrees(-Math.PI / 2)
    assertAlmostEquals(result, -90, 10)
  })

  it("should handle very small radian values", () => {
    const result = radiansToDegrees(0.0001)
    assertAlmostEquals(result, 0.0001 * (180 / Math.PI), 10)
  })

  it("should handle very large radian values", () => {
    const result = radiansToDegrees(1000000)
    assertAlmostEquals(result, 1000000 * (180 / Math.PI), 10)
  })
})

describe("cot", () => {
  it("should calculate cotangent of 0 radians", () => {
    const result = cot(0)
    assertEquals(result, Infinity)
  })

  it("should calculate cotangent of π/4 radians", () => {
    const result = cot(Math.PI / 4)
    assertAlmostEquals(result, 1, 10)
  })

  it("should calculate cotangent of π/2 radians", () => {
    const result = cot(Math.PI / 2)
    assertAlmostEquals(result, 0, 10)
  })

  it("should calculate cotangent of -π/4 radians", () => {
    const result = cot(-Math.PI / 4)
    assertAlmostEquals(result, -1, 10)
  })

  it("should handle very small radian values", () => {
    const result = cot(0.0001)
    assertAlmostEquals(result, 1 / Math.tan(0.0001), 10)
  })

  it("should handle very large radian values", () => {
    const result = cot(1000000)
    assertAlmostEquals(result, 1 / Math.tan(1000000), 10)
  })
})

describe("invertAngleAxis", () => {
  it("should convert 0 degrees to 90 degrees", () => {
    const result = invertAngleAxis(0)
    assertEquals(result, 90)
  })

  it("should convert 90 degrees to 0 degrees", () => {
    const result = invertAngleAxis(90)
    assertEquals(result, 0)
  })

  it("should convert 180 degrees to -90 degrees", () => {
    const result = invertAngleAxis(180)
    assertEquals(result, -90)
  })

  it("should convert -90 degrees to 180 degrees", () => {
    const result = invertAngleAxis(-90)
    assertEquals(result, 180)
  })

  it("should handle angles greater than 90 degrees", () => {
    const result = invertAngleAxis(120)
    assertEquals(result, -30)
  })

  it("should handle negative angles", () => {
    const result = invertAngleAxis(-45)
    assertEquals(result, 135)
  })

  it("should handle angles greater than 360 degrees", () => {
    const result = invertAngleAxis(450)
    assertEquals(result, -360)
  })

  it("should handle very large angles", () => {
    const result = invertAngleAxis(1000)
    assertEquals(result, -910)
  })

  it("should handle very small angles", () => {
    const result = invertAngleAxis(0.0001)
    assertAlmostEquals(result, 89.9999, 10)
  })
})

describe("calculateCoordinatesWhenApplyingForce", () => {
  it("should calculate new coordinates when force is applied at 0 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 0)
    assertEquals(result, { x: 10, y: 0 })
  })

  it("should calculate new coordinates when force is applied at 90 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 90)
    assertEquals(result, { x: 0, y: 10 })
  })

  it("should calculate new coordinates when force is applied at 180 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 180)
    assertEquals(result, { x: -10, y: 0 })
  })

  it("should calculate new coordinates when force is applied at 270 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 270)
    assertEquals(result, { x: -0, y: -10 })
  })

  it("should calculate new coordinates when force is applied at 45 degrees", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, 10, 45)
    assertEquals(result, { x: 7.07106781186548, y: 7.07106781186548 })
  })

  it("should calculate new coordinates when initial coordinates are not zero", () => {
    const result = calculateCoordinatesWhenApplyingForce(5, 5, 10, 45)
    assertEquals(result, { x: 12.07106781186548, y: 12.07106781186548 })
  })

  it("should handle negative force values", () => {
    const result = calculateCoordinatesWhenApplyingForce(0, 0, -10, 45)
    assertEquals(result, { x: -7.07106781186547, y: -7.07106781186547 })
  })

  it("should handle negative initial coordinates", () => {
    const result = calculateCoordinatesWhenApplyingForce(-5, -5, 10, 45)
    assertEquals(result, { x: 2.07106781186548, y: 2.07106781186547 })
  })
})

describe("arcctg", () => {
  it("should calculate arc-cotangent of 1", () => {
    const result = arcctg(1)
    assertAlmostEquals(result, Math.PI / 4, 10)
  })

  it("should calculate arc-cotangent of 0", () => {
    const result = arcctg(0)
    assertAlmostEquals(result, Math.PI / 2, 10)
  })

  it("should calculate arc-cotangent of -1", () => {
    const result = arcctg(-1)
    assertAlmostEquals(result, (3 * Math.PI) / 4, 10)
  })

  it("should handle very small values", () => {
    const result = arcctg(0.0001)
    assertAlmostEquals(result, Math.PI / 2 - Math.atan(0.0001), 10)
  })

  it("should handle very large values", () => {
    const result = arcctg(1000000)
    assertAlmostEquals(result, Math.PI / 2 - Math.atan(1000000), 10)
  })
})
