import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs"; // ensure Node environment
export const dynamic = "force-dynamic"; // override any inherited "error"
export const revalidate = 0; // no caching of this handler

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
    } = body;

    // Validate required fields
    if (!email || !fullName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Normalize private key (handle \n in .env)
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!privateKey || !clientEmail || !sheetId) {
      return NextResponse.json(
        { success: false, error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // Initialize Google Sheets client
    const jwt = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth: jwt });
    const timestamp = new Date().toISOString();

    // Prepare row in same order as sheet columns
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
      "Pending", // Application Status
    ];

    // Use your sheet tab name exactly (replace "Applications" if needed)
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Applications", 
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Join Us submission error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}