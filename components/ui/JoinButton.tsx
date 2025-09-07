"use client"

import React from "react"
import { Button } from "@/components/ui/button"

const JoinButton = () => {
  return (
    <Button
      size="lg"
      onClick={() =>
        window.open(
          "https://bit.ly/sliitmozilla-member-registrations",
          "_blank",
          "noopener,noreferrer",
        )
      }
    >
      Join Us!
    </Button>
  )
}

export default JoinButton
