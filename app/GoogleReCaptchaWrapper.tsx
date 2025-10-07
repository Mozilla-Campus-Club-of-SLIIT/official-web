"use client"

import { GoogleReCaptchaProvider } from "@google-recaptcha/react"

export default function GoogleReCaptchaWrapper({ children }: { children: React.ReactNode }) {
  // This key is used by the frontend to load and execute the reCAPTCHA script.
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!

  if (!siteKey) {
    console.warn("Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local")
  }

  return (
    <GoogleReCaptchaProvider
      siteKey={siteKey ?? ""}
      type="v3"
      isEnterprise={false}
      language="en"
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
