"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function RecruiterPage() {
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

        router.replace("/recruiter/profile");
      } catch {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  return null;
}
