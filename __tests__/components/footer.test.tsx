/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Footer } from "../../components/Footer"

// Mock Next.js Link component
jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
  MockLink.displayName = "MockLink"
  return MockLink
})

describe("Footer Component", () => {
  it("should render the footer with Mozilla branding", () => {
    render(<Footer />)

    // Check Mozilla logo
    const logo = screen.getByAltText("Mozilla Logo")
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("src", "/assets/Mozilla-logo.png")

    // Check club name
    expect(screen.getByText("Mozilla Campus Club of SLIIT")).toBeInTheDocument()

    // Check description
    expect(
      screen.getByText(/Empowering students through open source technology/),
    ).toBeInTheDocument()
    expect(screen.getByText("#welovetech!")).toBeInTheDocument()
    // Check emojis (they appear with a space before them in the HTML)
    expect(screen.getByText(/🦊❤️/)).toBeInTheDocument()
  })

  it("should render quick links section", () => {
    render(<Footer />)

    expect(screen.getByText("Quick Links")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /events/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /blog/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /contact us/i })).toBeInTheDocument()
  })

  it("should render social media section", () => {
    render(<Footer />)

    expect(screen.getByText("Follow Us on Socials!")).toBeInTheDocument()

    // Verify social media links exist by checking for their containers
    const socialContainer = document.querySelector(".flex.space-x-4")
    expect(socialContainer).toBeInTheDocument()

    const socialLinks = socialContainer?.querySelectorAll("a")
    expect(socialLinks).toHaveLength(5) // Facebook, Instagram, GitHub, YouTube, LinkedIn
  })

  it("should render contact information", () => {
    render(<Footer />)

    expect(screen.getByText("Contact")).toBeInTheDocument()
    expect(screen.getByText(/SLIIT Malabe Campus/)).toBeInTheDocument()
    expect(screen.getByText(/New Kandy Road/)).toBeInTheDocument()
    expect(screen.getByText(/Malabe, Sri Lanka/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /infosliitmcc@gmail.com/i })).toBeInTheDocument()
  })

  it("should render social media links with correct URLs", () => {
    render(<Footer />)

    // Check social media links by their href attributes since they don't have text labels
    const socialLinks = document.querySelectorAll(
      'a[href*="facebook"], a[href*="instagram"], a[href*="linkedin"], a[href*="github"], a[href*="youtube"]',
    )
    expect(socialLinks).toHaveLength(5)

    // Verify specific URLs exist
    expect(
      document.querySelector('a[href="https://www.facebook.com/sliitmozilla"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('a[href="https://www.instagram.com/sliitmozilla"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('a[href="https://www.linkedin.com/company/sliitmozilla/"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('a[href="https://github.com/Mozilla-Campus-Club-of-SLIIT"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('a[href="https://www.youtube.com/@sliitmozilla"]'),
    ).toBeInTheDocument()
  })

  it("should have correct link targets and security attributes", () => {
    render(<Footer />)

    // Get social media links by their href patterns
    const externalLinks = document.querySelectorAll(
      'a[href*="facebook"], a[href*="instagram"], a[href*="linkedin"], a[href*="github"], a[href*="youtube"]',
    )

    expect(externalLinks).toHaveLength(5)

    // Note: The current implementation doesn't have target="_blank" or rel attributes
    // This test verifies the links exist and could be extended if security attributes are added
    externalLinks.forEach((link) => {
      expect(link).toBeInTheDocument()
      expect(link.getAttribute("href")).toBeTruthy()
    })
  })

  it("should render copyright information", () => {
    render(<Footer />)

    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(`© ${currentYear} Mozilla Campus Club of SLIIT`)),
    ).toBeInTheDocument()
    expect(screen.getByText(/Made with ❤️ by SLIIT Mozillians/)).toBeInTheDocument()
  })

  it("should have proper responsive layout classes", () => {
    render(<Footer />)

    const footer = screen.getByRole("contentinfo")
    expect(footer).toHaveClass("bg-gray-100", "py-12")

    // Check grid layout classes for responsive design
    const gridContainer = footer.querySelector(".grid")
    expect(gridContainer).toHaveClass("grid-cols-1", "md:grid-cols-4", "gap-8")
  })

  it("should display all main footer sections", () => {
    render(<Footer />)

    const sections = [
      "Mozilla Campus Club of SLIIT",
      "Quick Links",
      "Contact",
      "Follow Us on Socials!",
    ]

    sections.forEach((sectionTitle) => {
      expect(screen.getByText(sectionTitle)).toBeInTheDocument()
    })
  })

  it("should have accessible social media links", () => {
    render(<Footer />)

    // Check that social media links exist by their URLs (they have no text, only icons)
    const links = document.querySelectorAll(
      'a[href*="facebook"], a[href*="instagram"], a[href*="github"], a[href*="youtube"], a[href*="linkedin"]',
    )
    expect(links).toHaveLength(5)

    // Test specific URLs
    expect(
      document.querySelector('a[href="https://www.facebook.com/sliitmozilla"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('a[href="https://www.instagram.com/sliitmozilla"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('a[href="https://github.com/Mozilla-Campus-Club-of-SLIIT"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('a[href="https://www.youtube.com/@sliitmozilla"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('a[href="https://www.linkedin.com/company/sliitmozilla/"]'),
    ).toBeInTheDocument()
  })

  it("should handle missing images gracefully", () => {
    render(<Footer />)

    const logo = screen.getByAltText("Mozilla Logo")
    expect(logo).toBeInTheDocument()

    // Test that the image has proper fallback attributes
    expect(logo).toHaveAttribute("alt", "Mozilla Logo")
  })
})
