"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NewsletterRedirect() {
  const router = useRouter()

  useEffect(() => {
    const handleScroll = async () => {
      // First navigate to home
      router.push("/")

      // Poll for the newsletter element
      let attempts = 0
      const maxAttempts = 50

      const checkAndScroll = setInterval(() => {
        const element = document.getElementById("newsletter")
        if (element) {
          clearInterval(checkAndScroll)
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        attempts++
        if (attempts >= maxAttempts) {
          clearInterval(checkAndScroll)
        }
      }, 100)
    }

    handleScroll()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Redirecting to newsletter...</p>
    </div>
  )
}
