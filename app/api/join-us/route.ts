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
    } = body

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

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Join Us submission error:", err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
