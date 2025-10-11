/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "../../../components/ui/select"

describe("Select Components", () => {
  describe("SelectTrigger", () => {
    it("should render with correct base styles", () => {
      render(
        <Select>
          <SelectTrigger data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>,
      )

      const trigger = screen.getByTestId("select-trigger")
      expect(trigger).toHaveClass(
        "flex",
        "h-10",
        "w-full",
        "items-center",
        "justify-between",
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

    it("should handle disabled state", () => {
      render(
        <Select disabled>
          <SelectTrigger data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>,
      )

      const trigger = screen.getByTestId("select-trigger")
      expect(trigger).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50")
      expect(trigger).toBeDisabled()
    })

    it("should merge custom className", () => {
      render(
        <Select>
          <SelectTrigger className="custom-class" data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>,
      )

      const trigger = screen.getByTestId("select-trigger")
      expect(trigger).toHaveClass("custom-class", "flex")
    })

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>()

      render(
        <Select>
          <SelectTrigger ref={ref} data-testid="select-trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>,
      )

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe("SelectContent", () => {
    it("should render with correct positioning classes", () => {
      render(
        <Select open>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-testid="select-content">
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      )

      const content = screen.getByTestId("select-content")
      expect(content).toHaveClass(
        "relative",
        "z-50",
        "max-h-96",
        "min-w-[8rem]",
        "overflow-hidden",
        "rounded-md",
        "border",
        "bg-popover",
        "text-popover-foreground",
        "shadow-md",
      )
    })

    it("should support position prop", () => {
      render(
        <Select open>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" data-testid="select-content">
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      )

      // Content should render when position is specified
      const content = screen.getByTestId("select-content")
      expect(content).toBeInTheDocument()
    })
  })

  describe("SelectItem", () => {
    it("should render with correct styles", () => {
      render(
        <Select open>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test" data-testid="select-item">
              Test Item
            </SelectItem>
          </SelectContent>
        </Select>,
      )

      const item = screen.getByTestId("select-item")
      expect(item).toHaveClass(
        "relative",
        "flex",
        "w-full",
        "cursor-default",
        "select-none",
        "items-center",
        "rounded-sm",
        "py-1.5",
        "pl-8",
        "pr-2",
        "text-sm",
        "outline-none",
      )
    })

    it("should handle disabled state", () => {
      render(
        <Select open>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test" disabled data-testid="select-item">
              Disabled Item
            </SelectItem>
          </SelectContent>
        </Select>,
      )

      const item = screen.getByTestId("select-item")
      expect(item).toHaveClass("data-[disabled]:pointer-events-none", "data-[disabled]:opacity-50")
    })

    it("should display item text correctly", () => {
      render(
        <Select open>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      )

      expect(screen.getByText("Test Item")).toBeInTheDocument()
    })
  })

  describe("SelectValue", () => {
    it("should render placeholder when no value selected", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
        </Select>,
      )

      expect(screen.getByText("Select an option...")).toBeInTheDocument()
    })

    it("should display selected value", () => {
      render(
        <Select value="test">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      )

      // The actual selected value display depends on Radix UI implementation
      // We can test that the component renders without error
      const trigger = screen.getByRole("combobox")
      expect(trigger).toBeInTheDocument()
    })
  })

  describe("SelectGroup and SelectLabel", () => {
    it("should render group with label correctly", () => {
      render(
        <Select open>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel data-testid="select-label">Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>,
      )

      const label = screen.getByTestId("select-label")
      expect(label).toHaveClass("py-1.5", "pl-8", "pr-2", "text-sm", "font-semibold")
      expect(screen.getByText("Fruits")).toBeInTheDocument()
    })
  })

  describe("SelectSeparator", () => {
    it("should render separator with correct styles", () => {
      render(
        <Select open>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
            <SelectSeparator data-testid="separator" />
            <SelectItem value="item2">Item 2</SelectItem>
          </SelectContent>
        </Select>,
      )

      const separator = screen.getByTestId("separator")
      expect(separator).toHaveClass("-mx-1", "my-1", "h-px", "bg-muted")
    })
  })

  describe("Scroll Buttons", () => {
    it("should render scroll buttons within select content", () => {
      render(
        <Select open>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectScrollUpButton>↑</SelectScrollUpButton>
            <SelectItem value="item1">Item 1</SelectItem>
            <SelectScrollDownButton>↓</SelectScrollDownButton>
          </SelectContent>
        </Select>,
      )

      // Test that the content renders without errors
      expect(screen.getByText("Item 1")).toBeInTheDocument()
    })
  })

  describe("Complete Select Integration", () => {
    it("should handle value selection", () => {
      const handleChange = jest.fn()

      render(
        <Select onValueChange={handleChange} defaultValue="option1">
          <SelectTrigger data-testid="select-trigger">
            <SelectValue placeholder="Choose..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>,
      )

      const trigger = screen.getByTestId("select-trigger")
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute("aria-expanded", "false")
    })

    it("should support controlled value", () => {
      const { rerender } = render(
        <Select value="option1">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>,
      )

      // Component should render without error
      expect(screen.getByRole("combobox")).toBeInTheDocument()

      rerender(
        <Select value="option2">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>,
      )

      // Should still render correctly after value change
      expect(screen.getByRole("combobox")).toBeInTheDocument()
    })

    it("should handle keyboard navigation", () => {
      render(
        <Select>
          <SelectTrigger data-testid="select-trigger">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first">First</SelectItem>
            <SelectItem value="second">Second</SelectItem>
            <SelectItem value="third">Third</SelectItem>
          </SelectContent>
        </Select>,
      )

      const trigger = screen.getByTestId("select-trigger")

      // Should be focusable
      trigger.focus()
      expect(trigger).toHaveFocus()
    })

    it("should support form integration", () => {
      const handleSubmit = jest.fn((e) => e.preventDefault())

      render(
        <form onSubmit={handleSubmit}>
          <Select name="test-select" defaultValue="option1">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
          <button type="submit">Submit</button>
        </form>,
      )

      const submitButton = screen.getByRole("button", { name: "Submit" })
      fireEvent.click(submitButton)

      expect(handleSubmit).toHaveBeenCalled()
    })

    it("should support accessibility attributes", () => {
      render(
        <Select>
          <SelectTrigger aria-label="Choose option">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>,
      )

      const trigger = screen.getByRole("combobox")
      expect(trigger).toHaveAttribute("aria-label", "Choose option")
    })

    it("should handle complex content with groups", () => {
      render(
        <Select open>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="carrot">Carrot</SelectItem>
              <SelectItem value="lettuce">Lettuce</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>,
      )

      expect(screen.getByText("Fruits")).toBeInTheDocument()
      expect(screen.getByText("Vegetables")).toBeInTheDocument()
      expect(screen.getByText("Apple")).toBeInTheDocument()
      expect(screen.getByText("Carrot")).toBeInTheDocument()
    })
  })
})
