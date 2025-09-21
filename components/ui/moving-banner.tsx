"use client"

import { useEffect, useRef } from "react"

interface MovingBannerProps {
  text: string
}

export function MovingBanner({ text }: MovingBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false) // track hover state

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    // Clone the content for seamless scrolling
    const clone = content.cloneNode(true) as HTMLDivElement
    container.appendChild(clone)

    let progress = 0
    // The maximum speed (pixels per frame) when not hovered.
    const MAX_SPEED = 1.25

    let currentSpeed = 0

    function animate() {
      // Set target speed based on hovering
      const targetSpeed = pausedRef.current ? 0 : MAX_SPEED

      // Gradually approach targetSpeed (a simple "ease" factor of 0.1).
      currentSpeed += (targetSpeed - currentSpeed) * 0.1

      // Update the position by the current speed.
      progress += currentSpeed

      // Loop back if we've scrolled beyond the content width.
      if (content && progress >= content.offsetWidth) {
        progress = 0
      }

      if (container) {
        container.style.transform = `translateX(-${progress}px)`
      }
      requestAnimationFrame(animate)
    }

    // Start animating
    const animationId = requestAnimationFrame(animate)

    // Cleanup on unmount
    return () => cancelAnimationFrame(animationId)
  }, [])

  const messages = [
    "Join Mozilla Campus Club SLIIT - Where Innovation Meets Open Source",
    "Code N' Coffee Podcast NOW LIVE on YouTube!",
    "Empowering Students Through Technology and Open Source",
    "Be Part of Something Bigger - Join Us Today!",
  ]
  const combinedText = messages.join(" • ")

  // Handlers to pause/resume on hover
  const handleMouseEnter = () => {
    pausedRef.current = true
  }
  const handleMouseLeave = () => {
    pausedRef.current = false
  }

  return (
    <div
      className="bg-orange-400 overflow-hidden py-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={containerRef} className="whitespace-nowrap">
        <div ref={contentRef} className="inline-block">
          <span className="text-primary font-medium px-4">{combinedText}</span>
        </div>
      </div>
    </div>
  )
}
