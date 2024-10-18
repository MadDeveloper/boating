import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import {
  calculateBearingFromRelativeBearing,
  calculateTrueBearing,
  calculateTrueRelativeBearing,
} from "../bearing.ts"

describe("calculateTrueBearing", () => {
  it("should return the correct true bearing when the sum is less than 360", () => {
    const result = calculateTrueBearing(45, 5)
    assertEquals(result, 50)
  })

  it("should return the correct true bearing when the sum is exactly 360", () => {
    const result = calculateTrueBearing(350, 10)
    assertEquals(result, 0)
  })

  it("should return the correct true bearing when the sum is more than 360", () => {
    const result = calculateTrueBearing(350, 15)
    assertEquals(result, 5)
  })

  it("should return the correct true bearing when the compass bearing is 0", () => {
    const result = calculateTrueBearing(0, 15)
    assertEquals(result, 15)
  })

  it("should return the correct true bearing when the compass bearing and variation are opposed", () => {
    const result = calculateTrueBearing(15, -15)
    assertEquals(result, 0)
  })

  it("should return the correct true bearing when the variation is 0", () => {
    const result = calculateTrueBearing(45, 0)
    assertEquals(result, 45)
  })

  it("should handle negative variation correctly", () => {
    const result = calculateTrueBearing(10, -20)
    assertEquals(result, 350)
  })

  it("should handle large positive compass bearing and large positive variation correctly", () => {
    const result = calculateTrueBearing(350, 350)
    assertEquals(result, 340)
  })
})

describe("calculateTrueRelativeBearing", () => {
  it("should return the correct true relative bearing when the sum is less than 360", () => {
    const result = calculateTrueRelativeBearing(45, 5)
    assertEquals(result, 50)
  })

  it("should return the correct true relative bearing when the sum is exactly 360", () => {
    const result = calculateTrueRelativeBearing(350, 10)
    assertEquals(result, 0)
  })

  it("should return the correct true relative bearing when the sum is more than 360", () => {
    const result = calculateTrueRelativeBearing(350, 15)
    assertEquals(result, 5)
  })

  it("should return the correct true relative bearing when the observed bearing is 0", () => {
    const result = calculateTrueRelativeBearing(0, 15)
    assertEquals(result, 15)
  })

  it("should return the correct true relative bearing when the observed bearing and instrumental error are opposed", () => {
    const result = calculateTrueRelativeBearing(15, -15)
    assertEquals(result, 0)
  })

  it("should return the correct true relative bearing when the instrumental error is 0", () => {
    const result = calculateTrueRelativeBearing(45, 0)
    assertEquals(result, 45)
  })

  it("should handle negative instrumental error correctly", () => {
    const result = calculateTrueRelativeBearing(10, -20)
    assertEquals(result, 350)
  })

  it("should handle large positive observed bearing and large positive instrumental error correctly", () => {
    const result = calculateTrueRelativeBearing(350, 350)
    assertEquals(result, 340)
  })
})

describe("calculateBearingFromRelativeBearing", () => {
  it("should return the correct bearing when the sum is less than 360", () => {
    const result = calculateBearingFromRelativeBearing(45, 90)
    assertEquals(result, 135)
  })

  it("should return the correct bearing when the sum is exactly 360", () => {
    const result = calculateBearingFromRelativeBearing(180, 180)
    assertEquals(result, 0)
  })

  it("should return the correct bearing when the sum is more than 360", () => {
    const result = calculateBearingFromRelativeBearing(350, 20)
    assertEquals(result, 10)
  })

  it("should return the correct bearing when the relative bearing is 0", () => {
    const result = calculateBearingFromRelativeBearing(0, 90)
    assertEquals(result, 90)
  })

  it("should return the correct bearing when the cape is 0", () => {
    const result = calculateBearingFromRelativeBearing(45, 0)
    assertEquals(result, 45)
  })

  it("should handle large positive relative bearing and large positive cape correctly", () => {
    const result = calculateBearingFromRelativeBearing(350, 350)
    assertEquals(result, 340)
  })
})
