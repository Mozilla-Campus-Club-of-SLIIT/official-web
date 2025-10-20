import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { isEmail } from "@/lib/validation"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

// In-memory per-IP sliding window rate limiter
const rateLimitStore = new Map<string, number[]>()
const WINDOW_MS = 60 * 1000 // 1 minute window
const MAX_REQUESTS = 5

function getClientIp(req: NextRequest): string {
  const ip =
    (req as any).ip ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  return ip
}

function checkRateLimit(ip: string) {
  const now = Date.now()
  const windowStart = now - WINDOW_MS
  const timestamps = rateLimitStore.get(ip) || []
  const recent = timestamps.filter((t) => t > windowStart)
  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0]
    const retryAfterSec = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000))
    return { allowed: false, retryAfterSec }
  }
  recent.push(now)
  rateLimitStore.set(ip, recent)
  return { allowed: true }
}

// Define the expected shape of the application payload
type ApplicationData = {
  email: string
  fullName: string
  studentId: string
  academicYear: string
  semester: string
  specialization: string
  whatsapp: string
  linkedin: string
  github: string
  reason: string
  otherClubs?: string
  preferredTeam?: string
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(req)
    const { allowed, retryAfterSec } = checkRateLimit(ip)
    if (!allowed) {
      return NextResponse.json(
        { success: false, errors: ["Too many requests, please try again later."] },
        { status: 429, headers: { "Retry-After": String(retryAfterSec) } },
      )
    }

    // Parse and type request body
    const body: ApplicationData = await req.json()

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

    // Field validation
    const errors: string[] = []
    if (!email || !isEmail(email)) errors.push("Invalid email")
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
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    // Env config and Google Sheets client
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const sheetId = process.env.GOOGLE_SHEET_ID

    if (!privateKey || !clientEmail || !sheetId) {
      return NextResponse.json(
        { success: false, errors: ["Server misconfiguration"] },
        { status: 500 },
      )
    }

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
    console.error("Apply submission error:", err)
    return NextResponse.json({ success: false, errors: ["Internal server error"] }, { status: 500 })
  }
}
