"use client";
import { useState, useRef } from "react";

export default function JoinUsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);
    const formEl = e.currentTarget;

    const formData = new FormData(formEl);
    // Collect multiple preferred team checkbox selections
    const preferredTeams = formData.getAll("preferredTeam") as string[];
    const payload = {
      email: formData.get("email"),
      fullName: formData.get("fullName"),
      studentId: formData.get("studentId"),
      academicYear: formData.get("academicYear"),
      semester: formData.get("semester"),
      specialization: formData.get("specialization"),
      whatsapp: formData.get("whatsapp"),
      linkedin: formData.get("linkedin"),
      github: formData.get("github"),
      reason: formData.get("reason"),
      otherClubs: formData.get("otherClubs"),
      // Join into a single string for backend (keeps route.ts unchanged)
      preferredTeam: preferredTeams.join(", "),
    };

    try {
      const res = await fetch("/api/join-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      // Defensive parse
      const text = await res.text();
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Non-JSON response from server");
      }

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed");
      }

      // Safe reset: we have the formEl reference from before any await
      formEl.reset(); // or: formRef.current?.reset();
      setMessage("Submitted successfully!");
    } catch (err: any) {
      setIsError(true);
      setMessage("Submission failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-bold mb-6">Join Us</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4"
        noValidate
      >
        <input
          name="fullName"
          required
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          name="studentId"
          placeholder="Student ID"
          className="w-full border p-2 rounded"
        />
        <select
          name="academicYear"
          required
          className="w-full border p-2 rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Academic Year
          </option>
          <option value="Year 1">Year 1</option>
          <option value="Year 2">Year 2</option>
          <option value="Year 3">Year 3</option>
          <option value="Year 4">Year 4</option>
        </select>
        <select
          name="semester"
          required
          className="w-full border p-2 rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Semester
          </option>
          <option value="Semester 1">Semester 1</option>
          <option value="Semester 2">Semester 2</option>
        </select>
        {/* Specialization dropdown */}
        <select
          name="specialization"
          required
          className="w-full border p-2 rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Specialization
          </option>
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
        <input
          name="whatsapp"
          placeholder="WhatsApp No"
          className="w-full border p-2 rounded"
        />
        <input
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          className="w-full border p-2 rounded"
        />
        <input
          name="github"
          placeholder="GitHub Profile URL"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="reason"
          placeholder="Reason of Interest"
          className="w-full border p-2 rounded"
        />
        <input
          name="otherClubs"
          placeholder="Other Clubs"
          className="w-full border p-2 rounded"
        />
        {/* Preferred Teams checkboxes */}
        <fieldset className="border p-3 rounded">
          <legend className="text-sm font-medium">Preferred Teams (select any)</legend>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              "Dev",
              "Design",
              "Editorial",
              "TV",
              "Other",
            ].map(team => (
              <label key={team} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="preferredTeam" value={team} /> {team}
              </label>
            ))}
          </div>
        </fieldset>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <div
          className="min-h-[1.25rem]"
          aria-live="polite"
          aria-atomic="true"
        >
          {message && (
            <p
              className={`text-sm ${
                isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}