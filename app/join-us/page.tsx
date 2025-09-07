"use client"
import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface FieldErrors {
  fullName?: string
  email?: string
  studentId?: string
  academicYear?: string
  semester?: string
  specialization?: string
  whatsappCountry?: string
  whatsappNumber?: string
  linkedin?: string
  github?: string
  reason?: string
  preferredTeam?: string
}

const preferredTeamOptions = ["Dev", "Design", "Editorial", "TV", "Other"] as const

export default function JoinUsPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [studentId, setStudentId] = useState("")
  const [academicYear, setAcademicYear] = useState("")
  const [semester, setSemester] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [whatsappCountryDigits, setWhatsappCountryDigits] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [github, setGithub] = useState("")
  const [reason, setReason] = useState("")
  const [otherClubs, setOtherClubs] = useState("")
  const [preferredTeams, setPreferredTeams] = useState<string[]>([])

  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const setFieldTouched = (field: string) => setTouched((t) => ({ ...t, [field]: true }))

  const validate = useCallback((): FieldErrors => {
    const nextErrors: FieldErrors = {}
    // Full Name: only letters & spaces, non-empty
    if (!fullName.trim()) nextErrors.fullName = "Full name is required"
    else if (!/^[A-Za-z ]+$/.test(fullName.trim())) nextErrors.fullName = "Only letters and spaces"

    // Email: basic pattern
    if (!email.trim()) nextErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = "Invalid email"

    if (!studentId.trim()) nextErrors.studentId = "Student ID is required"
    else if (!/^(IT|EN|BS|HS)\d{8}$/i.test(studentId.trim()))
      nextErrors.studentId = "Format: IT|EN|BS|HS followed by 8 digits"
    if (!academicYear) nextErrors.academicYear = "Select academic year"
    if (!semester) nextErrors.semester = "Select semester"
    if (!specialization) nextErrors.specialization = "Select specialization"

    // WhatsApp
    if (!/^[0-9]{1,3}$/.test(whatsappCountryDigits))
      nextErrors.whatsappCountry = "Country code 1-3 digits"
    if (!/^[0-9]{9}$/.test(whatsappNumber)) nextErrors.whatsappNumber = "Exactly 9 digits"

    // URLs
    const urlOk = (v: string) => {
      try {
        new URL(v)
        return true
      } catch {
        return false
      }
    }
    if (!linkedin.trim()) nextErrors.linkedin = "LinkedIn URL required"
    else if (
      !/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[A-Za-z0-9_-]+\/?$/i.test(
        linkedin.trim(),
      ) &&
      !/^(linkedin\.com\/(in|pub)\/[A-Za-z0-9_-]+\/?$)/i.test(linkedin.trim())
    )
      nextErrors.linkedin = "Enter a valid LinkedIn profile URL"

    if (!github.trim()) nextErrors.github = "GitHub URL required"
    else if (
      !/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/i.test(github.trim()) &&
      !/^(github\.com\/[A-Za-z0-9_.-]+\/?$)/i.test(github.trim())
    )
      nextErrors.github = "Enter a valid GitHub profile URL"

    if (!reason.trim()) nextErrors.reason = "Reason required"
    else if (reason.trim().length < 10) nextErrors.reason = "Min 10 characters"

    if (!preferredTeams || preferredTeams.length === 0) {
      nextErrors.preferredTeam = "Select at least one team"
    }

    return nextErrors
  }, [
    fullName,
    email,
    studentId,
    academicYear,
    semester,
    specialization,
    whatsappCountryDigits,
    whatsappNumber,
    linkedin,
    github,
    reason,
    preferredTeams,
  ])

  const runValidationAndSet = () => {
    const v = validate()
    setErrors(v)
    return v
  }

  const onCheckboxChange = (team: string) => {
    setPreferredTeams((prev) => {
      const updated = prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
      // Remove error if at least one selected
      if (updated.length > 0) {
        setErrors((errs) => ({ ...errs, preferredTeam: undefined }))
      }
      return updated
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Touch all fields to show inline errors
    ;[
      "fullName",
      "email",
      "studentId",
      "academicYear",
      "semester",
      "specialization",
      "whatsappCountry",
      "whatsappNumber",
      "linkedin",
      "github",
      "reason",
      "preferredTeam",
    ].forEach(setFieldTouched)
    const validation = runValidationAndSet()
    if (Object.keys(validation).length > 0) {
      setIsError(true)
      setMessage("Please fill all required fields marked with *")
      return
    }

    setLoading(true)
    setMessage(null)
    setIsError(false)

    const combinedWhatsApp = `+${whatsappCountryDigits}${whatsappNumber}`
    const payload = {
      email: email.trim(),
      fullName: fullName.trim(),
      studentId: studentId.trim(),
      academicYear,
      semester,
      specialization,
      whatsapp: combinedWhatsApp,
      linkedin: linkedin.trim(),
      github: github.trim(),
      reason: reason.trim(),
      otherClubs: otherClubs.trim() || "None",
      preferredTeam: preferredTeams.join(", "),
    }

    try {
      const res = await fetch("/api/join-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      })
      const text = await res.text()
      let json: any
      try {
        json = JSON.parse(text)
      } catch {
        throw new Error("Non-JSON response")
      }
      if (!res.ok || !json.success) throw new Error(json.error || "Submission failed")

      // Reset form
      setFullName("")
      setEmail("")
      setStudentId("")
      setAcademicYear("")
      setSemester("")
      setSpecialization("")
      setWhatsappCountryDigits("")
      setWhatsappNumber("")
      setLinkedin("")
      setGithub("")
      setReason("")
      setOtherClubs("")
      setPreferredTeams([])
      setTouched({})
      setErrors({})
      setMessage("Submitted successfully!")
      setSubmitted(true)
    } catch (err: any) {
      setIsError(true)
      // Try to parse backend error and set field errors
      let backendMsg = err.message || ""
      const newFieldErrors: Partial<FieldErrors> = {}
      if (backendMsg.includes("Invalid LinkedIn URL"))
        newFieldErrors.linkedin = "Enter a valid LinkedIn profile URL"
      if (backendMsg.includes("Invalid GitHub URL"))
        newFieldErrors.github = "Enter a valid GitHub profile URL"
      if (backendMsg.includes("Invalid student ID"))
        newFieldErrors.studentId = "Format: IT|EN|BS|HS followed by 8 digits"
      if (backendMsg.includes("Invalid email")) newFieldErrors.email = "Invalid email"
      if (backendMsg.includes("Full name required"))
        newFieldErrors.fullName = "Full name is required"
      if (backendMsg.includes("Academic year required"))
        newFieldErrors.academicYear = "Select academic year"
      if (backendMsg.includes("Semester required")) newFieldErrors.semester = "Select semester"
      if (backendMsg.includes("Specialization required"))
        newFieldErrors.specialization = "Select specialization"
      if (backendMsg.includes("Reason too short")) newFieldErrors.reason = "Min 10 characters"
      if (backendMsg.includes("WhatsApp required"))
        newFieldErrors.whatsappNumber = "WhatsApp required"
      setErrors((prev) => ({ ...prev, ...newFieldErrors }))
      setMessage("Submission failed: " + backendMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleBlur = (field: keyof FieldErrors) => {
    setFieldTouched(field)
    setErrors(validate())
  }

  // Dynamic input style helper
  const baseInput =
    "w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA7B2C] transition-colors"
  const errorInput = "border-red-500"
  const checkboxAccent = { accentColor: "#EA7B2C" } as const

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-orange-600">
              Registration Form - Mozilla Campus Club of SLIIT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed mb-4 text-center">
              Thank you for your interest in joining Mozilla Campus Club of SLIIT. Please use the
              following link to join our WhatsApp group.
            </p>
            <p className="text-center mb-6">
              <a
                href="https://chat.whatsapp.com/ClX4r9OY6R61ss00tRkNNS"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium break-all hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Join WhatsApp Group
              </a>
            </p>
            <div className="flex justify-center">
              <Link
                href="/"
                className="px-5 py-2.5 rounded text-sm font-medium bg-black text-white hover:bg-[#EA7B2C] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EA7B2C] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-bold mb-6">Join Us</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            name="fullName"
            value={fullName}
            onChange={(e) => {
              const val = e.target.value.replace(/[^A-Za-z ]/g, "")
              setFullName(val)
              // live validation
              setErrors((prev) => ({
                ...prev,
                fullName: !val.trim()
                  ? "Full name is required"
                  : !/^[A-Za-z ]+$/.test(val.trim())
                    ? "Only letters and spaces"
                    : undefined,
              }))
            }}
            onBlur={() => handleBlur("fullName")}
            className={`${baseInput} ${errors.fullName && touched.fullName ? errorInput : ""}`}
            placeholder="Full Name"
            required
            aria-invalid={!!errors.fullName && touched.fullName}
            aria-describedby={errors.fullName && touched.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && touched.fullName && (
            <p id="fullName-error" className="mt-1 text-xs text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`${baseInput} ${errors.email && touched.email ? errorInput : ""}`}
            placeholder="you@example.com"
            required
            aria-invalid={!!errors.email && touched.email}
            aria-describedby={errors.email && touched.email ? "email-error" : undefined}
          />
          {errors.email && touched.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Student ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Student ID *</label>
          <input
            name="studentId"
            value={studentId}
            onChange={(e) => {
              let v = e.target.value.toUpperCase()
              if (v.length > 10) v = v.slice(0, 10)
              if (v.length <= 2) v = v.replace(/[^A-Z]/g, "")
              else v = v.slice(0, 2).replace(/[^A-Z]/g, "") + v.slice(2).replace(/[^0-9]/g, "")
              setStudentId(v)
            }}
            maxLength={10}
            onBlur={() => handleBlur("studentId")}
            className={`${baseInput} ${errors.studentId && touched.studentId ? errorInput : ""}`}
            placeholder="e.g. IT2023XXXX"
            required
            aria-invalid={!!errors.studentId && touched.studentId}
            aria-describedby={errors.studentId && touched.studentId ? "studentId-error" : undefined}
          />
          {errors.studentId && touched.studentId && (
            <p id="studentId-error" className="mt-1 text-xs text-red-600">
              {errors.studentId}
            </p>
          )}
        </div>

        {/* Academic Year & Semester */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Academic Year *</label>
            <select
              name="academicYear"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              onBlur={() => handleBlur("academicYear")}
              className={`${baseInput} ${errors.academicYear && touched.academicYear ? errorInput : ""}`}
              required
            >
              <option value="">Select Year</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
            </select>
            {errors.academicYear && touched.academicYear && (
              <p className="mt-1 text-xs text-red-600">{errors.academicYear}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Semester *</label>
            <select
              name="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              onBlur={() => handleBlur("semester")}
              className={`${baseInput} ${errors.semester && touched.semester ? errorInput : ""}`}
              required
            >
              <option value="">Select Semester</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
            </select>
            {errors.semester && touched.semester && (
              <p className="mt-1 text-xs text-red-600">{errors.semester}</p>
            )}
          </div>
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium mb-1">Specialization *</label>
          <select
            name="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            onBlur={() => handleBlur("specialization")}
            className={`${baseInput} ${errors.specialization && touched.specialization ? errorInput : ""}`}
            required
          >
            <option value="">Select Specialization</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Data Science">Data Science</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Interactive Media">Interactive Media</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Information Systems Engineering">Information Systems Engineering</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Computer Systems Engineering">Computer Systems Engineering</option>
            <option value="Other">Other</option>
          </select>
          {errors.specialization && touched.specialization && (
            <p className="mt-1 text-xs text-red-600">{errors.specialization}</p>
          )}
        </div>

        {/* WhatsApp Split with Country Code Datalist */}
        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp Number *</label>
          <div className="flex gap-3">
            <div className="flex items-stretch">
              <span className="px-2 py-2 border border-r-0 rounded-l bg-gray-50 text-sm select-none">
                +
              </span>
              <input
                name="whatsappCountry"
                list="country-codes"
                value={whatsappCountryDigits}
                onChange={(e) => {
                  const raw = e.target.value
                  const digitsMatch = raw.match(/^\d{1,3}/)
                  const digits = digitsMatch ? digitsMatch[0] : raw.replace(/[^0-9]/g, "")
                  setWhatsappCountryDigits(digits.slice(0, 3))
                  setFieldTouched("whatsappCountry")
                  setErrors(validate())
                }}
                onBlur={() => handleBlur("whatsappCountry")}
                className={`${baseInput} w-28 rounded-l-none border-l-0 ${errors.whatsappCountry && touched.whatsappCountry ? errorInput : ""}`}
                placeholder="94"
                required
                inputMode="numeric"
                aria-invalid={!!errors.whatsappCountry && touched.whatsappCountry}
                aria-describedby={
                  errors.whatsappCountry && touched.whatsappCountry
                    ? "whatsappCountry-error"
                    : undefined
                }
              />
            </div>
            <input
              name="whatsappNumber"
              value={whatsappNumber}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 9)
                setWhatsappNumber(v)
                setFieldTouched("whatsappNumber")
                setErrors(validate())
              }}
              onBlur={() => handleBlur("whatsappNumber")}
              className={`${baseInput} flex-1 ${errors.whatsappNumber && touched.whatsappNumber ? errorInput : ""}`}
              placeholder="7XXXXXXXX"
              required
              inputMode="numeric"
              aria-invalid={!!errors.whatsappNumber && touched.whatsappNumber}
              aria-describedby={
                errors.whatsappNumber && touched.whatsappNumber ? "whatsappNumber-error" : undefined
              }
            />
          </div>
          <datalist id="country-codes">
            <option value="1 - United States / Canada / Caribbean" />
            <option value="7 - Russia / Kazakhstan" />
            <option value="20 - Egypt" />
            <option value="27 - South Africa" />
            <option value="30 - Greece" />
            <option value="31 - Netherlands" />
            <option value="32 - Belgium" />
            <option value="33 - France" />
            <option value="34 - Spain" />
            <option value="36 - Hungary" />
            <option value="39 - Italy" />
            <option value="40 - Romania" />
            <option value="41 - Switzerland" />
            <option value="43 - Austria" />
            <option value="44 - United Kingdom" />
            <option value="45 - Denmark" />
            <option value="46 - Sweden" />
            <option value="47 - Norway" />
            <option value="48 - Poland" />
            <option value="49 - Germany" />
            <option value="51 - Peru" />
            <option value="52 - Mexico" />
            <option value="53 - Cuba" />
            <option value="54 - Argentina" />
            <option value="55 - Brazil" />
            <option value="56 - Chile" />
            <option value="57 - Colombia" />
            <option value="58 - Venezuela" />
            <option value="60 - Malaysia" />
            <option value="61 - Australia" />
            <option value="62 - Indonesia" />
            <option value="63 - Philippines" />
            <option value="64 - New Zealand" />
            <option value="65 - Singapore" />
            <option value="66 - Thailand" />
            <option value="81 - Japan" />
            <option value="82 - South Korea" />
            <option value="84 - Vietnam" />
            <option value="86 - China" />
            <option value="90 - Turkey" />
            <option value="91 - India" />
            <option value="92 - Pakistan" />
            <option value="93 - Afghanistan" />
            <option value="94 - Sri Lanka" />
            <option value="95 - Myanmar" />
            <option value="98 - Iran" />
            <option value="212 - Morocco" />
            <option value="213 - Algeria" />
            <option value="216 - Tunisia" />
            <option value="218 - Libya" />
            <option value="220 - Gambia" />
            <option value="221 - Senegal" />
            <option value="222 - Mauritania" />
            <option value="223 - Mali" />
            <option value="224 - Guinea" />
            <option value="225 - Côte d'Ivoire" />
            <option value="226 - Burkina Faso" />
            <option value="227 - Niger" />
            <option value="228 - Togo" />
            <option value="229 - Benin" />
            <option value="230 - Mauritius" />
            <option value="231 - Liberia" />
            <option value="232 - Sierra Leone" />
            <option value="233 - Ghana" />
            <option value="234 - Nigeria" />
            <option value="235 - Chad" />
            <option value="236 - Central African Republic" />
            <option value="237 - Cameroon" />
            <option value="238 - Cape Verde" />
            <option value="239 - São Tomé and Príncipe" />
            <option value="240 - Equatorial Guinea" />
            <option value="241 - Gabon" />
            <option value="242 - Republic of the Congo" />
            <option value="243 - Democratic Republic of the Congo" />
            <option value="244 - Angola" />
            <option value="248 - Seychelles" />
            <option value="249 - Sudan" />
            <option value="250 - Rwanda" />
            <option value="251 - Ethiopia" />
            <option value="252 - Somalia" />
            <option value="253 - Djibouti" />
            <option value="254 - Kenya" />
            <option value="255 - Tanzania" />
            <option value="256 - Uganda" />
            <option value="260 - Zambia" />
            <option value="261 - Madagascar" />
            <option value="263 - Zimbabwe" />
            <option value="264 - Namibia" />
            <option value="265 - Malawi" />
            <option value="266 - Lesotho" />
            <option value="267 - Botswana" />
            <option value="268 - Eswatini" />
            <option value="269 - Comoros" />
            <option value="290 - Saint Helena" />
            <option value="291 - Eritrea" />
            <option value="297 - Aruba" />
            <option value="298 - Faroe Islands" />
            <option value="299 - Greenland" />
            <option value="350 - Gibraltar" />
            <option value="351 - Portugal" />
            <option value="352 - Luxembourg" />
            <option value="353 - Ireland" />
            <option value="354 - Iceland" />
            <option value="355 - Albania" />
            <option value="356 - Malta" />
            <option value="357 - Cyprus" />
            <option value="358 - Finland" />
            <option value="359 - Bulgaria" />
            <option value="370 - Lithuania" />
            <option value="371 - Latvia" />
            <option value="372 - Estonia" />
            <option value="373 - Moldova" />
            <option value="374 - Armenia" />
            <option value="375 - Belarus" />
            <option value="376 - Andorra" />
            <option value="377 - Monaco" />
            <option value="378 - San Marino" />
            <option value="380 - Ukraine" />
            <option value="381 - Serbia" />
            <option value="382 - Montenegro" />
            <option value="383 - Kosovo" />
            <option value="385 - Croatia" />
            <option value="386 - Slovenia" />
            <option value="387 - Bosnia and Herzegovina" />
            <option value="389 - North Macedonia" />
            <option value="420 - Czech Republic" />
            <option value="421 - Slovakia" />
            <option value="423 - Liechtenstein" />
            <option value="501 - Belize" />
            <option value="502 - Guatemala" />
            <option value="503 - El Salvador" />
            <option value="504 - Honduras" />
            <option value="505 - Nicaragua" />
            <option value="506 - Costa Rica" />
            <option value="507 - Panama" />
            <option value="509 - Haiti" />
            <option value="590 - Guadeloupe / Saint Martin / Saint Barthélemy" />
            <option value="591 - Bolivia" />
            <option value="592 - Guyana" />
            <option value="593 - Ecuador" />
            <option value="594 - French Guiana" />
            <option value="595 - Paraguay" />
            <option value="596 - Martinique" />
            <option value="597 - Suriname" />
            <option value="598 - Uruguay" />
            <option value="670 - East Timor" />
            <option value="672 - Australian External Territories" />
            <option value="673 - Brunei" />
            <option value="674 - Nauru" />
            <option value="675 - Papua New Guinea" />
            <option value="676 - Tonga" />
            <option value="677 - Solomon Islands" />
            <option value="678 - Vanuatu" />
            <option value="679 - Fiji" />
            <option value="680 - Palau" />
            <option value="681 - Wallis and Futuna" />
            <option value="682 - Cook Islands" />
            <option value="683 - Niue" />
            <option value="685 - Samoa" />
            <option value="686 - Kiribati" />
            <option value="687 - New Caledonia" />
            <option value="688 - Tuvalu" />
            <option value="689 - French Polynesia" />
            <option value="690 - Tokelau" />
            <option value="691 - Micronesia" />
            <option value="692 - Marshall Islands" />
            <option value="850 - North Korea" />
            <option value="852 - Hong Kong" />
            <option value="853 - Macau" />
            <option value="855 - Cambodia" />
            <option value="856 - Laos" />
            <option value="880 - Bangladesh" />
            <option value="886 - Taiwan" />
            <option value="960 - Maldives" />
            <option value="961 - Lebanon" />
            <option value="962 - Jordan" />
            <option value="963 - Syria" />
            <option value="964 - Iraq" />
            <option value="965 - Kuwait" />
            <option value="966 - Saudi Arabia" />
            <option value="967 - Yemen" />
            <option value="968 - Oman" />
            <option value="970 - Palestine" />
            <option value="971 - United Arab Emirates" />
            <option value="972 - Israel" />
            <option value="973 - Bahrain" />
            <option value="974 - Qatar" />
            <option value="975 - Bhutan" />
            <option value="976 - Mongolia" />
            <option value="977 - Nepal" />
            <option value="992 - Tajikistan" />
            <option value="993 - Turkmenistan" />
            <option value="994 - Azerbaijan" />
            <option value="995 - Georgia" />
            <option value="996 - Kyrgyzstan" />
            <option value="998 - Uzbekistan" />
          </datalist>
          {errors.whatsappCountry && touched.whatsappCountry && (
            <p id="whatsappCountry-error" className="mt-1 text-xs text-red-600">
              {errors.whatsappCountry}
            </p>
          )}
          {errors.whatsappNumber && touched.whatsappNumber && (
            <p id="whatsappNumber-error" className="mt-1 text-xs text-red-600">
              {errors.whatsappNumber}
            </p>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn URL *</label>
          <input
            name="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            onBlur={() => handleBlur("linkedin")}
            className={`${baseInput} ${errors.linkedin && touched.linkedin ? errorInput : ""}`}
            placeholder="https://www.linkedin.com/in/username"
            required
            aria-invalid={!!errors.linkedin && touched.linkedin}
          />
          {errors.linkedin && touched.linkedin && (
            <p className="mt-1 text-xs text-red-600">{errors.linkedin}</p>
          )}
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-sm font-medium mb-1">GitHub URL *</label>
          <input
            name="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            onBlur={() => handleBlur("github")}
            className={`${baseInput} ${errors.github && touched.github ? errorInput : ""}`}
            placeholder="https://github.com/username"
            required
            aria-invalid={!!errors.github && touched.github}
          />
          {errors.github && touched.github && (
            <p className="mt-1 text-xs text-red-600">{errors.github}</p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-1">Reason of Interest *</label>
          <textarea
            name="reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value)
              if (touched.reason) setErrors(validate())
            }}
            onBlur={() => handleBlur("reason")}
            className={`${baseInput} h-28 resize-y ${errors.reason && touched.reason ? errorInput : ""}`}
            placeholder="Tell us why you want to join (min 10 characters)"
            required
            aria-invalid={!!errors.reason && touched.reason}
          />
          {errors.reason && touched.reason && (
            <p className="mt-1 text-xs text-red-600">{errors.reason}</p>
          )}
        </div>

        {/* Other Clubs */}
        <div>
          <label className="block text-sm font-medium mb-1">Other Clubs</label>
          <input
            name="otherClubs"
            value={otherClubs}
            onChange={(e) => setOtherClubs(e.target.value)}
            className={baseInput}
            placeholder="If none, leave blank"
          />
        </div>

        {/* Preferred Teams */}
        <div>
          <fieldset
            className={`border rounded p-3 ${errors.preferredTeam && touched.preferredTeam ? "border-red-500" : "border-gray-300"}`}
          >
            <legend className="text-sm font-medium">Preferred Teams *</legend>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {preferredTeamOptions.map((team) => {
                const checked = preferredTeams.includes(team)
                return (
                  <label
                    key={team}
                    className="flex items-center gap-2 text-sm cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      value={team}
                      checked={checked}
                      onChange={() => {
                        onCheckboxChange(team)
                        setFieldTouched("preferredTeam")
                        setErrors(validate())
                      }}
                      style={checkboxAccent}
                    />
                    <span>{team}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
          {errors.preferredTeam && touched.preferredTeam && (
            <p className="mt-1 text-xs text-red-600">{errors.preferredTeam}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded text-sm font-medium bg-black text-white hover:bg-[#EA7B2C] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EA7B2C] transition-colors disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        <div className="min-h-[1.25rem]" aria-live="polite" aria-atomic="true">
          {message && (
            <p className={`text-sm ${isError ? "text-red-600" : "text-green-600"}`}>{message}</p>
          )}
        </div>
      </form>
    </div>
  )
}
