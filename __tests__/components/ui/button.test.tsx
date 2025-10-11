/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Button } from "../../../components/ui/button"

describe("Button Component", () => {
  it("should render with default variant and size", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-primary", "text-primary-foreground", "h-10", "px-4", "py-2")
  })

  it("should render different variants correctly", () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>)

    let button = screen.getByRole("button")
    expect(button).toHaveClass("bg-destructive", "text-destructive-foreground")

    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("border", "border-input", "bg-background")

    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("bg-secondary", "text-secondary-foreground")

    rerender(<Button variant="ghost">Ghost</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("hover:bg-accent", "hover:text-accent-foreground")

    rerender(<Button variant="link">Link</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("text-primary", "underline-offset-4")
  })

  it("should render different sizes correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>)

    let button = screen.getByRole("button")
    expect(button).toHaveClass("h-9", "rounded-md", "px-3")

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("h-11", "rounded-md", "px-8")

    rerender(<Button size="icon">Icon</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("h-10", "w-10")
  })

  it("should handle disabled state correctly", () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50")
  })

  it("should handle click events", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("should render as child when asChild prop is true", () => {
    render(
      <Button asChild>
        <a href="/link">Link Button</a>
      </Button>,
    )

    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass("inline-flex", "items-center", "justify-center")
    expect(link).toHaveAttribute("href", "/link")
  })

  it("should merge custom className with default classes", () => {
    render(<Button className="custom-class">Button</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-class")
    expect(button).toHaveClass("inline-flex", "items-center", "justify-center") // Default classes
  })

  it("should forward refs correctly", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Button</Button>)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("should have proper accessibility attributes", () => {
    render(
      <Button type="submit" aria-label="Submit form">
        Submit
      </Button>,
    )

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("type", "submit")
    expect(button).toHaveAttribute("aria-label", "Submit form")
  })

  it("should have focus-visible styles", () => {
    render(<Button>Focus me</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass(
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
    )
  })

  it("should handle keyboard navigation", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Button</Button>)

    const button = screen.getByRole("button")

    // Test that button is focusable
    button.focus()
    expect(button).toHaveFocus()

    // Test click functionality (keyboard events are handled by browser)
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("should not call onClick when disabled", () => {
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    )

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it("should render children correctly", () => {
    render(
      <Button>
        <span>Icon</span>
        <span>Text</span>
      </Button>,
    )

    expect(screen.getByText("Icon")).toBeInTheDocument()
    expect(screen.getByText("Text")).toBeInTheDocument()
  })

  it("should work with loading state (custom prop)", () => {
    render(<Button disabled>Loading...</Button>)

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent("Loading...")
  })
})
