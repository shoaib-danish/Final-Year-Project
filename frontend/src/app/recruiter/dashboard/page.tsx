"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function RecruiterDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const { user } = await res.json();

        if (user.role !== "recruiter") throw new Error();
      } catch {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <main>
      <Sidebar role="recruiter" />
     <h1 className="text-green-600 text-center text-3xl">Welcome Recruiter</h1>
    </main>
  );
}
