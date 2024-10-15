import { expect, suite, test } from "vitest"
import {
  convertLatitudeDegreesToNauticalMiles,
  convertNauticalMilesToLatitudeDegrees,
} from "../geography"

suite("convertNauticalMilesToLatitudeDegrees", () => {
  test("should convert 0 nautical miles to 0 degrees", () => {
    const result = convertNauticalMilesToLatitudeDegrees(0)
    expect(result).toBe(0)
  })

  test("should convert 60 nautical miles to 1 degree", () => {
    const result = convertNauticalMilesToLatitudeDegrees(60)
    expect(result).toBe(1)
  })

  test("should convert 120 nautical miles to 2 degrees", () => {
    const result = convertNauticalMilesToLatitudeDegrees(120)
    expect(result).toBe(2)
  })

  test("should handle fractional nautical miles correctly", () => {
    const result = convertNauticalMilesToLatitudeDegrees(30)
    expect(result).toBe(0.5)
  })

  test("should handle large values correctly", () => {
    const result = convertNauticalMilesToLatitudeDegrees(6000)
    expect(result).toBe(100)
  })

  suite("convertNauticalMilesToLatitudeDegrees", () => {
    test("should convert 0 nautical miles to 0 degrees", () => {
      const result = convertNauticalMilesToLatitudeDegrees(0)
      expect(result).toBe(0)
    })

    test("should convert 60 nautical miles to 1 degree", () => {
      const result = convertNauticalMilesToLatitudeDegrees(60)
      expect(result).toBe(1)
    })

    test("should convert 120 nautical miles to 2 degrees", () => {
      const result = convertNauticalMilesToLatitudeDegrees(120)
      expect(result).toBe(2)
    })

    test("should handle fractional nautical miles correctly", () => {
      const result = convertNauticalMilesToLatitudeDegrees(30)
      expect(result).toBe(0.5)
    })

    test("should handle large values correctly", () => {
      const result = convertNauticalMilesToLatitudeDegrees(6000)
      expect(result).toBe(100)
    })
  })
})

suite("convertLatitudeDegreesToNauticalMiles", () => {
  test("should convert 0 degrees to 0 nautical miles", () => {
    const result = convertLatitudeDegreesToNauticalMiles(0)
    expect(result).toBe(0)
  })

  test("should convert 1 degree to 60 nautical miles", () => {
    const result = convertLatitudeDegreesToNauticalMiles(1)
    expect(result).toBe(60)
  })

  test("should convert 2 degrees to 120 nautical miles", () => {
    const result = convertLatitudeDegreesToNauticalMiles(2)
    expect(result).toBe(120)
  })

  test("should handle fractional degrees correctly", () => {
    const result = convertLatitudeDegreesToNauticalMiles(0.5)
    expect(result).toBe(30)
  })

  test("should handle large values correctly", () => {
    const result = convertLatitudeDegreesToNauticalMiles(100)
    expect(result).toBe(6000)
  })
})
