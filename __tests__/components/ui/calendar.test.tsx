import { render } from "@testing-library/react"
import { Calendar } from "@/components/ui/calendar"

describe("Calendar Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Calendar />)

    // Should render a calendar structure
    const calendar = container.querySelector(".rdp-root")
    expect(calendar).toBeTruthy()
  })

  it("renders navigation buttons", () => {
    const { container } = render(<Calendar />)

    const prevButton = container.querySelector(".rdp-button_previous")
    const nextButton = container.querySelector(".rdp-button_next")

    expect(prevButton).toBeTruthy()
    expect(nextButton).toBeTruthy()
  })

  it("uses Chevron icons after v9 upgrade", () => {
    const { container } = render(<Calendar />)

    // Check for lucide chevron icons (v9 breaking change fix)
    const chevronLeft = container.querySelector(".lucide-chevron-left")
    const chevronRight = container.querySelector(".lucide-chevron-right")

    expect(chevronLeft).toBeTruthy()
    expect(chevronRight).toBeTruthy()
  })

  it("applies custom className", () => {
    const { container } = render(<Calendar className="custom-calendar" />)

    const calendar = container.querySelector(".rdp-root")
    expect(calendar?.classList.contains("custom-calendar")).toBe(true)
  })

  it("handles mode prop", () => {
    const { container } = render(<Calendar mode="single" />)

    const calendar = container.querySelector('[data-mode="single"]')
    expect(calendar).toBeTruthy()
  })

  it("renders month caption", () => {
    const { container } = render(<Calendar />)

    const monthCaption = container.querySelector(".rdp-month_caption")
    expect(monthCaption).toBeTruthy()
  })

  it("renders weekday headers", () => {
    const { container } = render(<Calendar />)

    const weekdays = container.querySelectorAll(".rdp-weekday")
    expect(weekdays.length).toBe(7) // Should have 7 weekdays
  })

  it("accepts onSelect callback without errors", () => {
    const mockOnSelect = jest.fn()

    expect(() => {
      render(<Calendar mode="single" onSelect={mockOnSelect} />)
    }).not.toThrow()

    // Should not be called during initial render
    expect(mockOnSelect).not.toHaveBeenCalled()
  })

  it("handles selected date prop", () => {
    const testDate = new Date("2024-01-15")

    expect(() => {
      render(<Calendar mode="single" selected={testDate} />)
    }).not.toThrow()
  })

  it("has proper accessibility structure", () => {
    const { container } = render(<Calendar />)

    const grid = container.querySelector('[role="grid"]')
    const table = container.querySelector(".rdp-month_grid")

    expect(grid).toBeTruthy()
    expect(table).toBeTruthy()
  })
})
