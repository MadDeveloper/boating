import { expect, suite, test } from "vitest"
import {
  calculateBearingFromRelativeBearing,
  calculateTrueBearing,
  calculateTrueRelativeBearing,
} from "../bearing"

suite("calculateTrueBearing", () => {
  test("should return the correct true bearing when the sum is less than 360", () => {
    const result = calculateTrueBearing(45, 5)
    expect(result).to.equal(50)
  })

  test("should return the correct true bearing when the sum is exactly 360", () => {
    const result = calculateTrueBearing(350, 10)
    expect(result).to.equal(0)
  })

  test("should return the correct true bearing when the sum is more than 360", () => {
    const result = calculateTrueBearing(350, 15)
    expect(result).to.equal(5)
  })

  test("should return the correct true bearing when the compass bearing is 0", () => {
    const result = calculateTrueBearing(0, 15)
    expect(result).to.equal(15)
  })

  test("should return the correct true bearing when the compass bearing and variation are opposed", () => {
    const result = calculateTrueBearing(15, -15)
    expect(result).to.equal(0)
  })

  test("should return the correct true bearing when the variation is 0", () => {
    const result = calculateTrueBearing(45, 0)
    expect(result).to.equal(45)
  })

  test("should handle negative variation correctly", () => {
    const result = calculateTrueBearing(10, -20)
    expect(result).to.equal(350)
  })

  test("should handle large positive compass bearing and large positive variation correctly", () => {
    const result = calculateTrueBearing(350, 350)
    expect(result).to.equal(340)
  })
})

suite("calculateTrueRelativeBearing", () => {
  test("should return the correct true relative bearing when the sum is less than 360", () => {
    const result = calculateTrueRelativeBearing(45, 5)
    expect(result).to.equal(50)
  })

  test("should return the correct true relative bearing when the sum is exactly 360", () => {
    const result = calculateTrueRelativeBearing(350, 10)
    expect(result).to.equal(0)
  })

  test("should return the correct true relative bearing when the sum is more than 360", () => {
    const result = calculateTrueRelativeBearing(350, 15)
    expect(result).to.equal(5)
  })

  test("should return the correct true relative bearing when the observed bearing is 0", () => {
    const result = calculateTrueRelativeBearing(0, 15)
    expect(result).to.equal(15)
  })

  test("should return the correct true relative bearing when the observed bearing and instrumental error are opposed", () => {
    const result = calculateTrueRelativeBearing(15, -15)
    expect(result).to.equal(0)
  })

  test("should return the correct true relative bearing when the instrumental error is 0", () => {
    const result = calculateTrueRelativeBearing(45, 0)
    expect(result).to.equal(45)
  })

  test("should handle negative instrumental error correctly", () => {
    const result = calculateTrueRelativeBearing(10, -20)
    expect(result).to.equal(350)
  })

  test("should handle large positive observed bearing and large positive instrumental error correctly", () => {
    const result = calculateTrueRelativeBearing(350, 350)
    expect(result).to.equal(340)
  })
})

suite("calculateBearingFromRelativeBearing", () => {
  test("should return the correct bearing when the sum is less than 360", () => {
    const result = calculateBearingFromRelativeBearing(45, 90)
    expect(result).to.equal(135)
  })

  test("should return the correct bearing when the sum is exactly 360", () => {
    const result = calculateBearingFromRelativeBearing(180, 180)
    expect(result).to.equal(0)
  })

  test("should return the correct bearing when the sum is more than 360", () => {
    const result = calculateBearingFromRelativeBearing(350, 20)
    expect(result).to.equal(10)
  })

  test("should return the correct bearing when the relative bearing is 0", () => {
    const result = calculateBearingFromRelativeBearing(0, 90)
    expect(result).to.equal(90)
  })

  test("should return the correct bearing when the cape is 0", () => {
    const result = calculateBearingFromRelativeBearing(45, 0)
    expect(result).to.equal(45)
  })

  test("should handle large positive relative bearing and large positive cape correctly", () => {
    const result = calculateBearingFromRelativeBearing(350, 350)
    expect(result).to.equal(340)
  })
})
