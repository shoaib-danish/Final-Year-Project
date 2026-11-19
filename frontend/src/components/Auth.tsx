"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthProps = {
  mode: "login" | "signup";
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const inputClass =
  "w-full rounded-xl border border-gray-400 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100";

export default function Auth({ mode }: AuthProps) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLogin) {
      setLoading(true);
      setMessage("");

      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        const selectedRole =
          role === "TPO/Admin" ? "admin" : role.toLowerCase();

        if (data.user.role !== selectedRole) {
          throw new Error("Please select the correct account role.");
        }

        // sessionStorage.setItem("token", data.token);

        if (data.user.role === "student") {
          router.push("/student");
        } else if (data.user.role === "recruiter") {
          router.push("/recruiter/profile");
        } else if (data.user.role === "admin") {
          router.push("/admin");
        }

      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    if (role === "TPO/Admin") {
      setMessage("Admin registration is not allowed.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          email,
          password,
          role: role.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setMessage(
        role === "Recruiter"
          ? "Registration successful! Awaiting admin approval."
          : "Registration successful! You can now log in."
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl md:min-h-[560px] md:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="hidden flex-col justify-between bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 p-10 text-white md:flex">
          <div className="mb-16">
            <h1 className="text-3xl font-bold leading-tight">
              Your Dream Job Starts
              <span className="text-blue-400"> On Campus.</span>
            </h1>

            <ul className="mt-8 space-y-5 font-medium text-slate-200">
              <li>✔ Apply to eligible companies</li>
              <li>✔ Stay updated on tests and interviews</li>
              <li>✔ Track application status and shortlists</li>
              <li>✔ Manage your placement journey</li>
            </ul>
          </div>

          <p className="font-semibold leading-relaxed text-slate-300">
            One platform, Every opportunity,
            <br />
            <span className="text-blue-400">A stronger start to your career.</span>
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="mb-16 flex flex-col justify-start p-6 sm:p-10">
          <h2 className="text-4xl font-bold text-slate-900">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="mb-8 mt-1 font-semibold text-gray-600">
            {isLogin
              ? "Log in to your placement portal."
              : "Register to start your placement journey."}
          </p>

          <div className="mb-5 flex gap-2 rounded-xl bg-gray-900 p-1 text-sm font-semibold">
            {["Student", "Recruiter", "TPO/Admin"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`flex-1 p-2 ${role === item
                    ? "rounded-xl bg-slate-200 font-semibold text-slate-900"
                    : "text-slate-100"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                required
              />
            )}

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-blue-700 py-3 font-semibold text-white shadow-lg shadow-indigo-700/50 transition hover:bg-indigo-800 active:scale-[0.98] disabled:opacity-60"
            >
              {role} {isLogin ? "Login" : "Sign up"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-blue-700">{message}</p>
          )}

          <p className="mt-5 text-center font-medium text-gray-800">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className="ml-2 font-semibold text-indigo-600 hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}