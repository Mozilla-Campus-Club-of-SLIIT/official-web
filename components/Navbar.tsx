"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Main Navbar component
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Detect current path for active link styling
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  // Toggle menu open/closed
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-colors 
        ${isScrolled ? "shadow-md bg-white/80 backdrop-blur-sm" : "bg-white"}
      `}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* --- Logo --- */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/assets/Mozilla-logo.png" alt="Mozilla Logo" className="h-6 w-auto" />
        </Link>

        {/* --- Desktop Nav Links --- */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/about" active={isActive("/about")}>
            About
          </NavLink>
          <NavLink href="/events" active={isActive("/events")}>
            Events
          </NavLink>
          <NavLink href="/blog" active={isActive("/blog")}>
            Blog
          </NavLink>
          <NavLink href="/contact" active={isActive("/contact")}>
            Contact Us
          </NavLink>

          <Button
            className="
              border border-transparent
              transition-colors duration-300
              hover:border-black
              hover:bg-white
              hover:text-black
            "
          >
            <Link href="/join-us" className="w-full h-full block">
              Join SLIIT Mozilla!
            </Link>
          </Button>
        </div>

        {/* --- Hamburger / Close Btn for Mobile --- */}
        <button onClick={toggleMenu} className="block md:hidden p-2 text-gray-700 relative group">
          {isMenuOpen ? (
            // Rotates on hover when open
            <X className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* 
        Mobile Drawer:
          - Always rendered but slides off-screen if not open
          - Use translate-x-full to hide, translate-x-0 to show
       */}
      <div
        className={`
          md:hidden
          absolute right-0 top-16 w-64 bg-white shadow-lg border-l p-6
          transition-transform duration-300 ease-in-out transform
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col space-y-4 text-left">
          <NavLinkMobile href="/about" active={isActive("/about")} closeMenu={toggleMenu}>
            About
          </NavLinkMobile>
          <NavLinkMobile href="/events" active={isActive("/events")} closeMenu={toggleMenu}>
            Events
          </NavLinkMobile>
          <NavLinkMobile href="/blog" active={isActive("/blog")} closeMenu={toggleMenu}>
            Blog
          </NavLinkMobile>
          <NavLinkMobile href="/contact" active={isActive("/contact")} closeMenu={toggleMenu}>
            Contact Us
          </NavLinkMobile>

          <hr />
          <Button
            className="
              w-full
              border border-transparent
              transition-colors duration-300
              hover:border-black
              hover:bg-white
              hover:text-black
            "
          >
            <Link href="/join-us" className="w-full h-full block">
              Join SLIIT Mozilla!
            </Link>
          </Button>
          <hr />
        </div>
      </div>
    </nav>
  )
}

/**
 * Desktop NavLink with underline hover
 */
function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative group inline-block">
      <Link
        href={href}
        className={`
          text-sm font-medium transition-colors
          ${active ? "font-bold text-black" : "hover:text-primary"}
        `}
      >
        {children}
      </Link>
      <span
        className="
          absolute left-0 bottom-0
          h-[2px] w-0
          bg-current
          group-hover:w-full
          transition-all duration-300
        "
      />
    </div>
  )
}

/**
 * Mobile NavLink (closes menu on click)
 */
function NavLinkMobile({
  href,
  active,
  children,
  closeMenu,
}: {
  href: string
  active: boolean
  children: React.ReactNode
  closeMenu: () => void
}) {
  return (
    <Link
      href={href}
      onClick={closeMenu}
      className={`
        text-sm font-medium transition-colors block
        ${active ? "font-bold text-black" : "hover:text-primary"}
      `}
    >
      {children}
    </Link>
  )
}
