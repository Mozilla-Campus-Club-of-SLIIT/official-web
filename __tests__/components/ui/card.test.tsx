/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card"

describe("Card Components", () => {
  describe("Card", () => {
    it("should render correctly with default styling", () => {
      render(
        <Card data-testid="card">
          <div>Card content</div>
        </Card>,
      )

      const card = screen.getByTestId("card")
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass(
        "rounded-lg",
        "border",
        "bg-card",
        "text-card-foreground",
        "shadow-sm",
      )
    })

    it("should merge custom className with default classes", () => {
      render(
        <Card className="custom-card" data-testid="card">
          Content
        </Card>,
      )

      const card = screen.getByTestId("card")
      expect(card).toHaveClass("custom-card")
      expect(card).toHaveClass("rounded-lg", "border") // Default classes
    })

    it("should forward refs correctly", () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Card ref={ref}>Content</Card>)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe("CardHeader", () => {
    it("should render with correct styling", () => {
      render(<CardHeader data-testid="card-header">Header content</CardHeader>)

      const header = screen.getByTestId("card-header")
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass("flex", "flex-col", "space-y-1.5", "p-6")
    })

    it("should contain CardTitle and CardDescription", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
        </Card>,
      )

      expect(screen.getByText("Test Title")).toBeInTheDocument()
      expect(screen.getByText("Test Description")).toBeInTheDocument()
    })
  })

  describe("CardTitle", () => {
    it("should render as h3 element with correct styling", () => {
      render(<CardTitle>Card Title</CardTitle>)

      const title = screen.getByRole("heading", { level: 3 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent("Card Title")
      expect(title).toHaveClass("text-2xl", "font-semibold", "leading-none", "tracking-tight")
    })

    it("should merge custom className", () => {
      render(<CardTitle className="custom-title">Title</CardTitle>)

      const title = screen.getByRole("heading")
      expect(title).toHaveClass("custom-title")
      expect(title).toHaveClass("text-2xl", "font-semibold") // Default classes
    })
  })

  describe("CardDescription", () => {
    it("should render as paragraph with correct styling", () => {
      render(<CardDescription>This is a description</CardDescription>)

      const description = screen.getByText("This is a description")
      expect(description).toBeInTheDocument()
      expect(description.tagName).toBe("P")
      expect(description).toHaveClass("text-sm", "text-muted-foreground")
    })
  })

  describe("CardContent", () => {
    it("should render with correct padding", () => {
      render(<CardContent data-testid="card-content">Main content here</CardContent>)

      const content = screen.getByTestId("card-content")
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass("p-6", "pt-0")
    })
  })

  describe("CardFooter", () => {
    it("should render with flex layout and padding", () => {
      render(<CardFooter data-testid="card-footer">Footer content</CardFooter>)

      const footer = screen.getByTestId("card-footer")
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass("flex", "items-center", "p-6", "pt-0")
    })
  })

  describe("Complete Card Structure", () => {
    it("should render a complete card with all components", () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Complete Card</CardTitle>
            <CardDescription>This is a complete card example</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the main content area of the card.</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>,
      )

      const card = screen.getByTestId("complete-card")
      expect(card).toBeInTheDocument()

      expect(screen.getByRole("heading", { name: "Complete Card" })).toBeInTheDocument()
      expect(screen.getByText("This is a complete card example")).toBeInTheDocument()
      expect(screen.getByText("This is the main content area of the card.")).toBeInTheDocument()
      expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument()
    })

    it("should maintain proper semantic structure", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Semantic Card</CardTitle>
            <CardDescription>Testing semantic structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div>Content area</div>
          </CardContent>
          <CardFooter>
            <div>Footer area</div>
          </CardFooter>
        </Card>,
      )

      // Check that elements are in the correct order
      const card = screen.getByText("Semantic Card").closest("div")
      expect(card).toBeInTheDocument()

      // Verify the heading comes before content
      const heading = screen.getByRole("heading")
      const content = screen.getByText("Content area")

      expect(
        heading.compareDocumentPosition(content) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy()
    })

    it("should handle empty components gracefully", () => {
      render(
        <Card>
          <CardHeader />
          <CardContent />
          <CardFooter />
        </Card>,
      )

      // Should render without errors even with empty components
      expect(document.querySelector('[class*="rounded-lg"]')).toBeInTheDocument()
    })

    it("should support nested content", () => {
      render(
        <Card>
          <CardContent>
            <div data-testid="nested-content">
              <p>Nested paragraph</p>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
              </ul>
            </div>
          </CardContent>
        </Card>,
      )

      const nestedContent = screen.getByTestId("nested-content")
      expect(nestedContent).toBeInTheDocument()
      expect(screen.getByText("Nested paragraph")).toBeInTheDocument()
      expect(screen.getByText("List item 1")).toBeInTheDocument()
      expect(screen.getByText("List item 2")).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should maintain focus management", () => {
      render(
        <Card tabIndex={0} data-testid="focusable-card">
          <CardContent>Focusable card content</CardContent>
        </Card>,
      )

      const card = screen.getByTestId("focusable-card")
      card.focus()
      expect(card).toHaveFocus()
    })
  })
})
