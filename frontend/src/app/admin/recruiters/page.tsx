
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

type Recruiter = {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  approval_status: string;
  company_name: string | null;
  designation: string | null;
  website: string | null;
  contact_number: string | null;
  description: string | null;
};

export default function ManageRecruiters() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/recruiters?status=pending`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recruiters");
        return res.json();
      })
      .then((data) => setRecruiters(data.recruiters))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="flex min-h-screen">
      <Sidebar role="admin" />

      <main className="flex-1 p-8">
        <h1 className="text-2xl text-center font-bold mb-6">
          Manage Recruiters
        </h1>

        {loading ? (
          <p>Loading recruiters...</p>
        ) : recruiters.length === 0 ? (
          <p>No pending recruiters.</p>
        ) : (
          <div className="space-y-6">
            {recruiters.map((r) => (
              <div key={r.id} className="rounded-lg bg-slate-200 border p-3 
               border-b border-black max-w-xl">
                <h2 className="font-semibold">{r.full_name}</h2>
                <p className="text-sm text-gray-500">{r.email}</p>
                <p><strong>Company:</strong> {r.company_name || "Not provided"}</p>
                <p><strong>Designation:</strong> {r.designation || "Not provided"}</p>
                <p><strong>Website:</strong> {r.website || "Not provided"}</p>
                <p><strong>Contact:</strong> {r.contact_number || "Not provided"}</p>
                <p><strong>Description:</strong> {r.description || "Not provided"}</p>
                <p></p>
                <p className="text-sm text-gray-500">
                  Registered: {new Date(r.created_at).toLocaleDateString()}
                </p>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
