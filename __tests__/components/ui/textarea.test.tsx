/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { Textarea } from "../../../components/ui/textarea"

describe("Textarea Component", () => {
  it("should render as textarea element", () => {
    render(<Textarea data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea.tagName).toBe("TEXTAREA")
  })

  it("should apply base styles correctly", () => {
    render(<Textarea data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveClass(
      "flex",
      "min-h-[80px]",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-3",
      "py-2",
      "text-sm",
      "ring-offset-background",
    )
  })

  it("should handle placeholder text", () => {
    render(<Textarea placeholder="Enter your message..." />)

    const textarea = screen.getByPlaceholderText("Enter your message...")
    expect(textarea).toBeInTheDocument()
  })

  it("should handle value changes", async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()

    render(<Textarea onChange={handleChange} data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea") as HTMLTextAreaElement

    await user.type(textarea, "Hello World")

    expect(textarea.value).toBe("Hello World")
    expect(handleChange).toHaveBeenCalled()
  })

  it("should support controlled value", () => {
    const { rerender } = render(<Textarea value="Initial value" readOnly />)

    const textarea = screen.getByDisplayValue("Initial value")
    expect(textarea).toBeInTheDocument()

    rerender(<Textarea value="Updated value" readOnly />)

    expect(screen.getByDisplayValue("Updated value")).toBeInTheDocument()
    expect(screen.queryByDisplayValue("Initial value")).not.toBeInTheDocument()
  })

  it("should handle disabled state", () => {
    render(<Textarea disabled data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50")
  })

  it("should merge custom className", () => {
    render(<Textarea className="custom-class" data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveClass("custom-class")
    expect(textarea).toHaveClass("flex") // base class should still be there
  })

  it("should forward ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>()

    render(<Textarea ref={ref} data-testid="textarea" />)

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    expect(ref.current).toBe(screen.getByTestId("textarea"))
  })

  it("should handle focus and blur events", async () => {
    const user = userEvent.setup()
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()

    render(<Textarea onFocus={handleFocus} onBlur={handleBlur} data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")

    await user.click(textarea)
    expect(handleFocus).toHaveBeenCalled()

    await user.tab()
    expect(handleBlur).toHaveBeenCalled()
  })

  it("should support rows attribute", () => {
    render(<Textarea rows={5} data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveAttribute("rows", "5")
  })

  it("should support cols attribute", () => {
    render(<Textarea cols={50} data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveAttribute("cols", "50")
  })

  it("should support maxLength attribute", () => {
    render(<Textarea maxLength={100} data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveAttribute("maxLength", "100")
  })

  it("should handle required attribute", () => {
    render(<Textarea required data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toBeRequired()
  })

  it("should support autoFocus", () => {
    render(<Textarea autoFocus data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveFocus()
  })

  it("should support readOnly state", () => {
    render(<Textarea readOnly value="Read only text" data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea") as HTMLTextAreaElement
    expect(textarea).toHaveAttribute("readOnly")
    expect(textarea.value).toBe("Read only text")
  })

  it("should handle focus ring styles correctly", () => {
    render(<Textarea data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveClass(
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
    )
  })

  it("should handle keyboard events", async () => {
    const user = userEvent.setup()
    const handleKeyDown = jest.fn()

    render(<Textarea onKeyDown={handleKeyDown} data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")

    await user.type(textarea, "{enter}")
    expect(handleKeyDown).toHaveBeenCalled()
  })

  it("should handle form submission", () => {
    const handleSubmit = jest.fn((e) => e.preventDefault())

    render(
      <form onSubmit={handleSubmit}>
        <Textarea name="message" defaultValue="Test message" />
        <button type="submit">Submit</button>
      </form>,
    )

    const submitButton = screen.getByRole("button", { name: "Submit" })
    fireEvent.click(submitButton)

    expect(handleSubmit).toHaveBeenCalled()
  })

  it("should support aria attributes for accessibility", () => {
    render(
      <Textarea
        aria-label="Message input"
        aria-describedby="message-description"
        data-testid="textarea"
      />,
    )

    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveAttribute("aria-label", "Message input")
    expect(textarea).toHaveAttribute("aria-describedby", "message-description")
  })

  it("should handle focus ring styles", async () => {
    const user = userEvent.setup()

    render(<Textarea data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")

    await user.click(textarea)
    expect(textarea).toHaveClass("focus-visible:ring-2")
    expect(textarea).toHaveClass("focus-visible:ring-ring")
    expect(textarea).toHaveClass("focus-visible:ring-offset-2")
  })

  it("should handle paste events", async () => {
    const user = userEvent.setup()
    const handlePaste = jest.fn()

    render(<Textarea onPaste={handlePaste} data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")

    await user.click(textarea)
    await user.paste("Pasted text")

    expect(handlePaste).toHaveBeenCalled()
  })

  it("should maintain proper tab order", () => {
    render(
      <div>
        <input data-testid="input-before" />
        <Textarea data-testid="textarea" />
        <input data-testid="input-after" />
      </div>,
    )

    const inputBefore = screen.getByTestId("input-before")
    const textarea = screen.getByTestId("textarea")
    const inputAfter = screen.getByTestId("input-after")

    expect(textarea.tabIndex).toBe(0)

    // Verify tab order by checking they're all focusable
    inputBefore.focus()
    expect(inputBefore).toHaveFocus()

    textarea.focus()
    expect(textarea).toHaveFocus()

    inputAfter.focus()
    expect(inputAfter).toHaveFocus()
  })
})
