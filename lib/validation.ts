// Validation helpers
export const isNonEmpty = (v: string) => v.trim().length > 0
export const isOnlyLettersSpaces = (v: string) => /^[A-Za-z ]+$/.test(v.trim())
// Email: safe, non-backtracking check (fast, not RFC-complete)
export const isEmail = (v: string) => {
  const s = v.trim()
  if (!s || s.length > 254) return false
  const at = s.indexOf("@")
  if (at <= 0 || at !== s.lastIndexOf("@") || at >= s.length - 1) return false
  const local = s.slice(0, at)
  const domain = s.slice(at + 1)
  if (local.length > 64) return false
  // Allow common local-part characters (unquoted)
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false
  const labels = domain.split(".")
  if (labels.length < 2) return false
  for (const label of labels) {
    if (!label || label.length > 63) return false
    // Alnum and hyphen inside, but no leading/trailing hyphen
    if (!/^[A-Za-z0-9-]+$/.test(label)) return false
    if (label.startsWith("-") || label.endsWith("-")) return false
  }
  // TLD should be at least 2 alpha chars
  const tld = labels[labels.length - 1]
  if (!/^[A-Za-z]{2,}$/.test(tld)) return false
  return true
}
export const isStudentId = (v: string) => /^(IT|EN|BS|HS)\d{8}$/i.test(v.trim())
export const isLinkedIn = (v: string) =>
  /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[A-Za-z0-9_-]+\/?$/i.test(v.trim()) ||
  /^(linkedin\.com\/(in|pub)\/[A-Za-z0-9_-]+\/?$)/i.test(v.trim())
export const isGithub = (v: string) =>
  /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/i.test(v.trim()) ||
  /^(github\.com\/[A-Za-z0-9_.-]+\/?$)/i.test(v.trim())
export const minLen = (v: string, n: number) => v.trim().length >= n
export const isDigits = (v: string, n: number) => new RegExp(`^\\d{${n}}$`).test(v)
export const isDigitsRange = (v: string, min: number, max: number) =>
  new RegExp(`^\\d{${min},${max}}$`).test(v)
