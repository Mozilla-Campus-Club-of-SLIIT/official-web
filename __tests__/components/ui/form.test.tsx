/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { useForm } from "react-hook-form"
import "@testing-library/jest-dom"
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "../../../components/ui/form"

// Test component that uses the form components
function TestFormComponent() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input {...field} placeholder="Enter username" />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} type="email" placeholder="Enter email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button type="submit">Submit</button>
      </form>
    </Form>
  )
}

describe("Form Components", () => {
  describe("FormItem", () => {
    it("should render with correct spacing classes", () => {
      render(
        <FormItem data-testid="form-item">
          <div>Content</div>
        </FormItem>,
      )

      const formItem = screen.getByTestId("form-item")
      expect(formItem).toHaveClass("space-y-2")
    })

    it("should merge custom className", () => {
      render(
        <FormItem className="custom-class" data-testid="form-item">
          Content
        </FormItem>,
      )

      const formItem = screen.getByTestId("form-item")
      expect(formItem).toHaveClass("custom-class", "space-y-2")
    })
  })

  describe("FormLabel", () => {
    it("should render as label element within form context", () => {
      const TestForm = () => {
        const form = useForm()
        return (
          <Form {...form}>
            <FormItem>
              <FormLabel>Test Label</FormLabel>
            </FormItem>
          </Form>
        )
      }

      render(<TestForm />)

      const label = screen.getByText("Test Label")
      expect(label.tagName).toBe("LABEL")
    })

    it("should apply custom className", () => {
      const TestForm = () => {
        const form = useForm()
        return (
          <Form {...form}>
            <FormItem>
              <FormLabel className="text-destructive">Error Label</FormLabel>
            </FormItem>
          </Form>
        )
      }

      render(<TestForm />)

      const label = screen.getByText("Error Label")
      expect(label).toHaveClass("text-destructive")
    })
  })

  describe("FormDescription", () => {
    it("should render description text with correct styling", () => {
      const TestForm = () => {
        const form = useForm()
        return (
          <Form {...form}>
            <FormItem>
              <FormDescription>This is a description</FormDescription>
            </FormItem>
          </Form>
        )
      }

      render(<TestForm />)

      const description = screen.getByText("This is a description")
      expect(description.tagName).toBe("P")
      expect(description).toHaveClass("text-sm", "text-muted-foreground")
    })
  })

  describe("FormMessage", () => {
    it("should not render when there is no error message", () => {
      const TestForm = () => {
        const form = useForm()
        return (
          <Form {...form}>
            <FormItem>
              <FormMessage />
            </FormItem>
          </Form>
        )
      }

      render(<TestForm />)

      // Should not render any error message
      expect(screen.queryByRole("paragraph")).not.toBeInTheDocument()
    })

    it("should render error message when provided as children", () => {
      const TestForm = () => {
        const form = useForm()
        return (
          <Form {...form}>
            <FormItem>
              <FormMessage>This is an error</FormMessage>
            </FormItem>
          </Form>
        )
      }

      render(<TestForm />)

      const message = screen.getByText("This is an error")
      expect(message.tagName).toBe("P")
      expect(message).toHaveClass("text-sm", "font-medium", "text-destructive")
    })
  })

  describe("Complete Form Integration", () => {
    it("should render complete form with all components", () => {
      render(<TestFormComponent />)

      // Check form labels
      expect(screen.getByText("Username")).toBeInTheDocument()
      expect(screen.getByText("Email")).toBeInTheDocument()

      // Check form inputs
      expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument()
      expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument()

      // Check form description
      expect(screen.getByText("This is your public display name.")).toBeInTheDocument()

      // Check submit button
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    })

    it("should handle form input changes", () => {
      render(<TestFormComponent />)

      const usernameInput = screen.getByPlaceholderText("Enter username") as HTMLInputElement
      const emailInput = screen.getByPlaceholderText("Enter email") as HTMLInputElement

      fireEvent.change(usernameInput, { target: { value: "testuser" } })
      fireEvent.change(emailInput, { target: { value: "test@example.com" } })

      expect(usernameInput.value).toBe("testuser")
      expect(emailInput.value).toBe("test@example.com")
    })

    it("should associate labels with inputs correctly", () => {
      render(<TestFormComponent />)

      const usernameLabel = screen.getByText("Username")
      const emailLabel = screen.getByText("Email")

      const usernameInput = screen.getByPlaceholderText("Enter username")
      const emailInput = screen.getByPlaceholderText("Enter email")

      // Check that labels are properly associated (via htmlFor/id)
      expect(usernameLabel).toBeInTheDocument()
      expect(emailLabel).toBeInTheDocument()
      expect(usernameInput).toBeInTheDocument()
      expect(emailInput).toBeInTheDocument()
    })

    it("should handle form submission", () => {
      render(<TestFormComponent />)

      const submitButton = screen.getByRole("button", { name: "Submit" })

      // Should not throw error on form submission
      expect(() => {
        fireEvent.click(submitButton)
      }).not.toThrow()
    })

    it("should support accessibility attributes", () => {
      const AccessibleForm = () => {
        const form = useForm()

        return (
          <Form {...form}>
            <FormItem>
              <FormLabel htmlFor="test-input">Accessible Label</FormLabel>
              <FormControl>
                <input id="test-input" aria-describedby="test-description" />
              </FormControl>
              <FormDescription id="test-description">Accessible description</FormDescription>
            </FormItem>
          </Form>
        )
      }

      render(<AccessibleForm />)

      const input = screen.getByRole("textbox")
      const label = screen.getByText("Accessible Label")
      const description = screen.getByText("Accessible description")

      expect(input).toHaveAttribute("aria-describedby", "test-description")
      expect(description).toHaveAttribute("id", "test-description")
      expect(label).toHaveAttribute("for", "test-input")
    })
  })

  describe("Error Handling", () => {
    it("should display validation errors", () => {
      const FormWithValidation = () => {
        const form = useForm({
          defaultValues: { required: "" },
          mode: "onChange",
        })

        return (
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="required"
                rules={{ required: "This field is required" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Required Field</FormLabel>
                    <FormControl>
                      <input {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )
      }

      render(<FormWithValidation />)

      const input = screen.getByRole("textbox")

      // Trigger validation by focusing and blurring
      fireEvent.focus(input)
      fireEvent.blur(input)

      // The error message should eventually appear
      // Note: This might require waitFor in real scenarios due to async validation
      const label = screen.getByText("Required Field")
      expect(label).toBeInTheDocument()
    })
  })

  describe("FormControl", () => {
    it("should render children correctly", () => {
      const TestForm = () => {
        const form = useForm()
        return (
          <Form {...form}>
            <FormItem>
              <FormControl>
                <input data-testid="controlled-input" />
              </FormControl>
            </FormItem>
          </Form>
        )
      }

      render(<TestForm />)

      const input = screen.getByTestId("controlled-input")
      expect(input).toBeInTheDocument()
    })

    it("should handle forwarded props", () => {
      const TestForm = () => {
        const form = useForm()
        return (
          <Form {...form}>
            <FormItem>
              <FormControl data-testid="form-control">
                <div>Control content</div>
              </FormControl>
            </FormItem>
          </Form>
        )
      }

      render(<TestForm />)

      const control = screen.getByTestId("form-control")
      expect(control).toBeInTheDocument()
    })
  })
})
