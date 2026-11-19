"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

const PROFILE_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/recruiter/profile`;

const EMPTY = {
  companyName: "",
  designation: "",
  website: "",
  contactNumber: "",
  companyDescription: "",
};
type Profile = typeof EMPTY;

const FIELDS: {
  name: keyof Profile;
  label: string;
  type: string;
  auto: string;
  placeholder: string;
  required?: boolean;
}[] = [
  { name: "companyName", label: "Company name", type: "text", auto: "organization", placeholder: "e.g. Acme Technologies", required: true },
  { name: "designation", label: "Your designation", type: "text", auto: "organization-title", placeholder: "e.g. Talent Acquisition Manager" },
  { name: "website", label: "Company website", type: "url", auto: "url", placeholder: "https://example.com" },
  { name: "contactNumber", label: "Contact number", type: "tel", auto: "tel", placeholder: "+1 (555) 000-0000" },
];

// Saved-details card: listed column by column (left: first 3, right: last 2)
const DETAILS: [keyof Profile, string, string][] = [
  ["companyName", "Company Name", "🏢"],
  ["website", "Website", "🌐"],
  ["contactNumber", "Contact Number", "📞"],
  ["designation", "Designation", "👤"],
  ["companyDescription", "Description", "📄"],
];

async function request(options?: RequestInit) {
  const res = await fetch(PROFILE_URL, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message ?? "Something went wrong.");
  return body;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100";

export default function RecruiterProfilePage() {
  const [profile, setProfile] = useState<Profile>(EMPTY);
  const [hasSaved, setHasSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [savedProfile, setSavedProfile] = useState<Profile>(EMPTY)
    const busy = isLoading || isSaving;

 useEffect(() => {
  request()
    .then(({ profile, data, ...rest }) => {
      const r = (profile ?? data ?? rest);
      const p = Array.isArray(r) ? r[0] : r;

      if (!p?.company_name && !p?.companyName) return;

      const loaded: Profile = {
        companyName: p.company_name ?? p.companyName,
        designation: p.designation ?? "",
        website: p.website ?? "",
        contactNumber: p.contact_number ?? p.contactNumber ?? "",
        companyDescription: p.description ?? p.companyDescription ?? "",
      };
      setProfile(loaded);
      setSavedProfile(loaded);
      setHasSaved(true);
    })
    .catch(err => setError(err.message))
    .finally(() => setIsLoading(false));
}, []);

  function updateField(field: keyof Profile, value: string) {
    setProfile((p) => ({ ...p, [field]: value }));
    setError("");
    setSuccess("");
  }

  function handleCancel() {
    setProfile(savedProfile);
    setIsEditing(false);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      await request({ method: "POST", body: JSON.stringify(profile) });
      setSavedProfile(profile)
      setHasSaved(true);
      setIsEditing(false);
      setSuccess("Your company profile has been saved.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }

  const showCard = hasSaved && !isEditing && !isLoading;

  return (
    <div className="flex min-h-screen">
      <Sidebar role="recruiter" />

      <main className="min-w-0 flex-1">
        
   <header className="relative w-full overflow-hidden">
  <div className="relative aspect-[1765/208] w-full">
    <Image
      src="/images/RecProfHeader-banner.png"
      alt="Recruiter workspace banner"
      fill
      priority
      sizes="(min-width: 1024px) calc(100vw - 16rem), 100vw"
      className="object-cover object-right"
    />
    {/* Subtle gradient on the left */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-800/50 via-blue-300/20 to-transparent" />
  </div>
</header>

        {/* Padding + width limit live here instead */}
        <div className="px-4 pb-10 pt-8 sm:px-16 lg:px-10 -ml-16">
          <div className="mx-auto max-w-4xl">
            {isLoading && <p className="mb-6 rounded-lg bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700">Loading your company profile…</p>}
            {error && <p role="alert" className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
            {success && <p role="status" className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</p>}


{showCard ? (
  <section className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-md">

    {/* Header */}
    <div className="flex flex-col gap-4 border-t-[5px] border-blue-600 border-b px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-blue-50 text-blue-600 shadow-sm">
          {DETAILS.find(d => d[0] === "companyName")?.[2] || "🏢"}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Company Details
          </p>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-950">
            {profile.companyName || "Company Name"}
          </h2>
        </div>
      </div>
    </div>

    {/* Details */}
    <div className="grid gap-5 border-b border-slate-200 p-6 sm:grid-cols-2 sm:gap-5 sm:p-8">
      {DETAILS.map(([key, label, icon]) => (
        <div
          key={key}
          className={`flex min-w-0 items-center gap-3 rounded-xl border border-slate-300 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md ${
            key === "companyDescription" ? "sm:col-span-2" : ""
          }`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-blue-50 text-blue-600">
            {icon}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {label}
            </p>

            <p className="mt-1 break-words whitespace-pre-line text-[15px] font-semibold text-slate-900">
              {!profile[key] ? (
                <span className="font-normal text-slate-400">
                  Not added
                </span>
              ) : key === "website" ? (
                <a
                  href={profile[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {profile[key]} ↗
                </a>
              ) : (
                profile[key]
              )}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div className="flex flex-col gap-4 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">


      <button
        type="button"
        onClick={() => {
          setIsEditing(true);
          setSuccess("");
        }}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        ✏️ Edit Profile
      </button>
    </div>

  </section>
) : (
  // Keep your existing form section unchanged
  <section>
    {/* Your existing form code */}
  </section>
)}


          </div>
        </div>
      </main>
    </div>
  );
}