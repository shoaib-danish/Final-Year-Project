"use client";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function StudentPage({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error();
        const { user } = await res.json();
        if (user.role !== "student") throw new Error();
      } catch {
        router.replace("/login");
      }
    })();
  }, [router]);

  return (
    <>

    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="student" />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  
   
    </>
  );
}