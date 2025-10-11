import {
  format,
  addDays,
  subDays,
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
  endOfDay,
} from "date-fns"

describe("date-fns", () => {
  describe("format function", () => {
    it("formats dates with various patterns", () => {
      const testDate = new Date("2024-01-15T10:30:00Z")

      expect(format(testDate, "yyyy-MM-dd")).toBe("2024-01-15")
      expect(format(testDate, "MMM do, yyyy")).toBe("Jan 15th, 2024")
      expect(format(testDate, "HH:mm:ss")).toMatch(/\d{2}:\d{2}:\d{2}/)
    })

    it("handles different locales and timezones", () => {
      const testDate = new Date("2024-06-15T12:00:00Z")

      expect(format(testDate, "EEEE")).toBe("Saturday")
      expect(format(testDate, "MMMM")).toBe("June")
    })
  })

  describe("date arithmetic functions", () => {
    it("adds days correctly", () => {
      const baseDate = new Date("2024-01-15")
      const result = addDays(baseDate, 5)

      expect(format(result, "yyyy-MM-dd")).toBe("2024-01-20")
    })

    it("subtracts days correctly", () => {
      const baseDate = new Date("2024-01-15")
      const result = subDays(baseDate, 3)

      expect(format(result, "yyyy-MM-dd")).toBe("2024-01-12")
    })

    it("handles month boundaries", () => {
      const endOfJan = new Date("2024-01-31")
      const nextDay = addDays(endOfJan, 1)

      expect(format(nextDay, "yyyy-MM-dd")).toBe("2024-02-01")
    })
  })

  describe("comparison functions", () => {
    it("compares dates correctly with isAfter", () => {
      const date1 = new Date("2024-01-15")
      const date2 = new Date("2024-01-10")

      expect(isAfter(date1, date2)).toBe(true)
      expect(isAfter(date2, date1)).toBe(false)
    })

    it("compares dates correctly with isBefore", () => {
      const date1 = new Date("2024-01-10")
      const date2 = new Date("2024-01-15")

      expect(isBefore(date1, date2)).toBe(true)
      expect(isBefore(date2, date1)).toBe(false)
    })

    it("handles equal dates", () => {
      const date1 = new Date("2024-01-15T10:30:00")
      const date2 = new Date("2024-01-15T10:30:00")

      expect(isAfter(date1, date2)).toBe(false)
      expect(isBefore(date1, date2)).toBe(false)
    })
  })

  describe("parsing functions", () => {
    it("parses ISO strings correctly", () => {
      const isoString = "2024-01-15T10:30:00Z"
      const parsed = parseISO(isoString)

      expect(parsed).toBeInstanceOf(Date)
      expect(format(parsed, "yyyy-MM-dd")).toBe("2024-01-15")
    })

    it("handles malformed ISO strings", () => {
      expect(() => {
        const result = parseISO("invalid-date")
        return isNaN(result.getTime())
      }).not.toThrow()
    })
  })

  describe("utility functions", () => {
    it("gets start of day correctly", () => {
      const testDate = new Date("2024-01-15T14:30:45")
      const startDay = startOfDay(testDate)

      expect(format(startDay, "HH:mm:ss")).toBe("00:00:00")
      expect(format(startDay, "yyyy-MM-dd")).toBe("2024-01-15")
    })

    it("gets end of day correctly", () => {
      const testDate = new Date("2024-01-15T14:30:45")
      const endDay = endOfDay(testDate)

      expect(format(endDay, "HH:mm:ss")).toBe("23:59:59")
      expect(format(endDay, "yyyy-MM-dd")).toBe("2024-01-15")
    })
  })
})
