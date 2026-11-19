"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const { user } = await res.json();

        if (user.role !== "admin") throw new Error();
      } catch {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
   <div className="flex min-h-screen">
  <Sidebar role="admin" />

  <main className="flex-1 p-8">
    <h1 className="text-3xl text-center font-bold">Welcome TPO/Admin</h1>
  </main>
</div>
  );
}