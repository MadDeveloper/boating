import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import {
  convertLatitudeDegreesToNauticalMiles,
  convertNauticalMilesToLatitudeDegrees,
} from "../geography.ts"

describe("convertNauticalMilesToLatitudeDegrees", () => {
  it("should convert 0 nautical miles to 0 degrees", () => {
    const result = convertNauticalMilesToLatitudeDegrees(0)
    assertEquals(result, 0)
  })

  it("should convert 60 nautical miles to 1 degree", () => {
    const result = convertNauticalMilesToLatitudeDegrees(60)
    assertEquals(result, 1)
  })

  it("should convert 120 nautical miles to 2 degrees", () => {
    const result = convertNauticalMilesToLatitudeDegrees(120)
    assertEquals(result, 2)
  })

  it("should handle fractional nautical miles correctly", () => {
    const result = convertNauticalMilesToLatitudeDegrees(30)
    assertEquals(result, 0.5)
  })

  it("should handle large values correctly", () => {
    const result = convertNauticalMilesToLatitudeDegrees(6000)
    assertEquals(result, 100)
  })

  describe("convertNauticalMilesToLatitudeDegrees", () => {
    it("should convert 0 nautical miles to 0 degrees", () => {
      const result = convertNauticalMilesToLatitudeDegrees(0)
      assertEquals(result, 0)
    })

    it("should convert 60 nautical miles to 1 degree", () => {
      const result = convertNauticalMilesToLatitudeDegrees(60)
      assertEquals(result, 1)
    })

    it("should convert 120 nautical miles to 2 degrees", () => {
      const result = convertNauticalMilesToLatitudeDegrees(120)
      assertEquals(result, 2)
    })

    it("should handle fractional nautical miles correctly", () => {
      const result = convertNauticalMilesToLatitudeDegrees(30)
      assertEquals(result, 0.5)
    })

    it("should handle large values correctly", () => {
      const result = convertNauticalMilesToLatitudeDegrees(6000)
      assertEquals(result, 100)
    })
  })
})

describe("convertLatitudeDegreesToNauticalMiles", () => {
  it("should convert 0 degrees to 0 nautical miles", () => {
    const result = convertLatitudeDegreesToNauticalMiles(0)
    assertEquals(result, 0)
  })

  it("should convert 1 degree to 60 nautical miles", () => {
    const result = convertLatitudeDegreesToNauticalMiles(1)
    assertEquals(result, 60)
  })

  it("should convert 2 degrees to 120 nautical miles", () => {
    const result = convertLatitudeDegreesToNauticalMiles(2)
    assertEquals(result, 120)
  })

  it("should handle fractional degrees correctly", () => {
    const result = convertLatitudeDegreesToNauticalMiles(0.5)
    assertEquals(result, 30)
  })

  it("should handle large values correctly", () => {
    const result = convertLatitudeDegreesToNauticalMiles(100)
    assertEquals(result, 6000)
  })
})
