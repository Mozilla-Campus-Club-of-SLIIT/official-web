/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Input } from "../../../components/ui/input"

describe("Input Component", () => {
  it("should render correctly with default props", () => {
    render(<Input placeholder="Enter text" />)

    const input = screen.getByPlaceholderText("Enter text")
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass("flex", "h-10", "w-full", "rounded-md", "border")
  })

  it("should handle text input correctly", () => {
    render(<Input placeholder="Type here" />)

    const input = screen.getByPlaceholderText("Type here") as HTMLInputElement

    fireEvent.change(input, { target: { value: "Hello World" } })
    expect(input.value).toBe("Hello World")
  })

  it("should handle different input types", () => {
    const { rerender } = render(<Input type="email" />)

    let input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("type", "email")

    rerender(<Input type="password" />)
    input = screen.getByDisplayValue("") // Password input doesn't have textbox role
    expect(input).toHaveAttribute("type", "password")

    rerender(<Input type="number" />)
    input = screen.getByRole("spinbutton")
    expect(input).toHaveAttribute("type", "number")
  })

  it("should handle disabled state", () => {
    render(<Input disabled placeholder="Disabled input" />)

    const input = screen.getByPlaceholderText("Disabled input")
    expect(input).toBeDisabled()
    expect(input).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50")
  })

  it("should handle required attribute", () => {
    render(<Input required placeholder="Required field" />)

    const input = screen.getByPlaceholderText("Required field")
    expect(input).toBeRequired()
  })

  it("should merge custom className with default classes", () => {
    render(<Input className="custom-class" placeholder="Custom input" />)

    const input = screen.getByPlaceholderText("Custom input")
    expect(input).toHaveClass("custom-class")
    expect(input).toHaveClass("flex", "h-10", "w-full") // Default classes
  })

  it("should forward refs correctly", () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("should handle focus and blur events", () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()

    render(<Input onFocus={handleFocus} onBlur={handleBlur} placeholder="Focus test" />)

    const input = screen.getByPlaceholderText("Focus test")

    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)

    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it("should have proper focus styles", () => {
    render(<Input placeholder="Focus styles" />)

    const input = screen.getByPlaceholderText("Focus styles")
    expect(input).toHaveClass("focus-visible:outline-none", "focus-visible:ring-2")
  })

  it("should handle maxLength attribute", () => {
    render(<Input maxLength={10} placeholder="Max 10 chars" />)

    const input = screen.getByPlaceholderText("Max 10 chars")
    expect(input).toHaveAttribute("maxLength", "10")
  })

  it("should handle value and onChange props (controlled)", () => {
    const handleChange = jest.fn()
    const TestComponent = () => {
      const [value, setValue] = React.useState("initial")

      return (
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            handleChange(e)
          }}
          placeholder="Controlled input"
        />
      )
    }

    render(<TestComponent />)

    const input = screen.getByDisplayValue("initial")
    expect(input).toBeInTheDocument()

    fireEvent.change(input, { target: { value: "updated" } })
    expect(handleChange).toHaveBeenCalled()
    expect(screen.getByDisplayValue("updated")).toBeInTheDocument()
  })

  it("should handle keyboard events", () => {
    const handleKeyDown = jest.fn()
    const handleKeyUp = jest.fn()

    render(<Input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} placeholder="Keyboard test" />)

    const input = screen.getByPlaceholderText("Keyboard test")

    fireEvent.keyDown(input, { key: "Enter" })
    expect(handleKeyDown).toHaveBeenCalledTimes(1)

    fireEvent.keyUp(input, { key: "Enter" })
    expect(handleKeyUp).toHaveBeenCalledTimes(1)
  })

  it("should have proper accessibility attributes", () => {
    render(
      <Input aria-label="Search input" aria-describedby="search-help" placeholder="Search..." />,
    )

    const input = screen.getByLabelText("Search input")
    expect(input).toHaveAttribute("aria-describedby", "search-help")
  })

  it("should handle readOnly attribute", () => {
    render(<Input readOnly value="Read only value" />)

    const input = screen.getByDisplayValue("Read only value")
    expect(input).toHaveAttribute("readOnly")
  })

  it("should handle defaultValue for uncontrolled inputs", () => {
    render(<Input defaultValue="Default text" placeholder="Default value test" />)

    const input = screen.getByDisplayValue("Default text")
    expect(input).toBeInTheDocument()
  })

  it("should handle file input type", () => {
    render(<Input type="file" accept=".jpg,.png" data-testid="file-input" />)

    const input = screen.getByTestId("file-input")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("type", "file")
    expect(input).toHaveAttribute("accept", ".jpg,.png")
  })
})
