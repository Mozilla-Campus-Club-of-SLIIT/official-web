"use client"

import { useState, useEffect } from "react"
import Loading from "./loading"

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate a short delay or wait for hydration
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 1.5s

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    // Show loading screen
    return <Loading />
  }

  return <>{children}</>
}
