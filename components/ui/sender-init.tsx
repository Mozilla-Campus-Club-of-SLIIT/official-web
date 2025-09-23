"use client"

import { useEffect } from "react"

export default function SenderInit() {
  useEffect(() => {
    const accountId = process.env.NEXT_PUBLIC_SENDER_ACCOUNT_ID
    const w = window as any
    if (typeof w !== "undefined" && typeof w.sender === "function") {
      try {
        w.sender(accountId)
      } catch (error) {
        console.error("Error initializing Sender:", error)
      }
    }
  }, [])
  return null
}
