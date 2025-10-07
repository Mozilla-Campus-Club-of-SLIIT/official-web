import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      email,
      fullName,
      studentId,
      academicYear,
      semester,
      specialization,
      whatsapp,
      linkedin,
      github,
      reason,
      otherClubs,
      preferredTeam,
      token,
    } = body

    // To integrate reCAPTCHA into your application, you need to configure both the site key and secret key.
    // 1. **Site Key**: This key is used on the **Frontend** to interact with reCAPTCHA and display the widget.
    // 2. **Secret Key**: This key is used on the **Backend** to verify the reCAPTCHA token sent from the frontend.
    //
    // Steps to set up reCAPTCHA:
    // 1. Visit the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create) to create a new reCAPTCHA project.
    // 2. During the setup process, you'll need to specify your **domain** (e.g., `localhost` for development or your production domain).
    // 3. Once created, you'll get two keys:
    //    - **Site Key** (used on the frontend for the reCAPTCHA widget).
    //    - **Secret Key** (used on the backend for verifying the reCAPTCHA response).
    //
    // 4. **Add Keys to `.env.local`**:
    //    - **SITE_KEY**: Store this in the **Frontend** for rendering the reCAPTCHA widget.
    //    - **SECRET_KEY**: Store this in the **Backend** for token verification (used in API requests).
    //
    // Example configuration in `.env.local` file:
    //   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
    //   RECAPTCHA_SECRET_KEY=your-secret-key-here
    //
    // After configuration, reCAPTCHA will help protect your forms from spam and abuse by verifying the authenticity of user submissions.

    // Secret key from environmental variables
    const secretKey = process.env.RECAPTCHA_SECRET_KEY!
    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: "Missing reCAPTCHA secret key" },
        { status: 500 },
      )
    }

    //console.log("✅ Received reCAPTCHA token:", token)

    // Site Verify
    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey!,
        response: token,
      }),
    })

    // To check recaptcha is working correctly
    const verificationResult = await recaptchaResponse.json()
    //console.log("✅ reCAPTCHA verification result:", verificationResult)

    // Recaptcha v3 accept action
    // This action is created by when your key is requesting tokens

    if (verificationResult.action !== "join_us_submit") {
      return NextResponse.json(
        { success: false, error: "reCAPTCHA action mismatch" },
        { status: 400 },
      )
    }

    // Error handling, if the verification result score is below 0.5 or verification result isn't success, it sends "reCAPTCHA verification failed" error
    if (!verificationResult.success || verificationResult.score < 0.5) {
      return NextResponse.json(
        { success: false, error: "reCAPTCHA verification failed" },
        { status: 400 },
      )
    }

    // Basic validation (mirror client)
    const errors: string[] = []
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Invalid email")
    if (!fullName) errors.push("Full name required")
    if (!studentId || !/^(IT|EN|BS|HS)\d{8}$/i.test(studentId)) errors.push("Invalid student ID")
    if (!academicYear) errors.push("Academic year required")
    if (!semester) errors.push("Semester required")
    if (!specialization) errors.push("Specialization required")
    if (
      !linkedin ||
      !/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[A-Za-z0-9_-]+\/?$/i.test(linkedin)
    )
      errors.push("Invalid LinkedIn URL")
    if (!github || !/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/i.test(github))
      errors.push("Invalid GitHub URL")
    if (!reason || reason.trim().length < 10) errors.push("Reason too short")
    if (!whatsapp) errors.push("WhatsApp required")

    if (errors.length) {
      return NextResponse.json({ success: false, error: errors.join(", ") }, { status: 400 })
    }

    // Normalize private key (handle \n in .env)
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const sheetId = process.env.GOOGLE_SHEET_ID

    if (!privateKey || !clientEmail || !sheetId) {
      return NextResponse.json(
        { success: false, error: "Server misconfiguration" },
        { status: 500 },
      )
    }

    // Initialize Google Sheets client
    const jwt = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth: jwt })
    const timestamp = new Date().toISOString()

    const row = [
      timestamp,
      email,
      fullName,
      studentId,
      academicYear,
      semester,
      specialization,
      whatsapp,
      linkedin,
      github,
      reason,
      otherClubs,
      preferredTeam,
      "Pending",
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Applications",
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    })

    console.log("✅ reCAPTCHA token verified successfully")
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Join Us submission error:", err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
