"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  GraduationCap,
  LayoutDashboard,
  Search,
  Briefcase,
  Bookmark,
  CalendarDays,
  FileText,
  BookOpen,
  Bell,
  User,
  Users,
  Building2,
  ShieldCheck,
  BarChart3,
  Settings,
  PlusCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";

type UserRole = "student" | "recruiter" | "admin";

interface SidebarProps {
  role: string;
}

const menuItems = {
  student: [
    { name: "Find Jobs", href: "/student", icon: Search },
    { name: "My Applications", href: "/student/applications", icon: Briefcase },
    { name: "Saved Jobs", href: "/student/saved-jobs", icon: Bookmark },
    { name: "Interviews", href: "/student/interviews", icon: CalendarDays },
    { name: "My Resume", href: "/student/resume", icon: FileText },
    { name: "Preparation", href: "/student/preparation", icon: BookOpen },
    { name: "Notifications", href: "/student/notifications", icon: Bell },
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/student/profile", icon: User },
  ],

recruiter: [
  { name: "Company Profile", href: "/recruiter/profile", icon: Building2 },
  { name: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { name: "Jobs", href: "/recruiter/jobs", icon: Briefcase },
  { name: "Applicants", href: "/recruiter/applicants", icon: Users },
  { name: "Interviews", href: "/recruiter/interviews", icon: CalendarDays },
],

admin: [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Manage Students", href: "/admin/students", icon: Users },
  { name: "Manage Recruiters", href: "/admin/recruiters", icon: ShieldCheck },
  { name: "Manage Jobs", href: "/admin/jobs", icon: Briefcase },
  { name: "Placement Reports", href: "/admin/reports", icon: BarChart3 },
],
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Convert the role into a standard value
  const normalizedRole = role.toLowerCase();

  let currentRole: UserRole = "student";

  if (normalizedRole === "recruiter") {
    currentRole = "recruiter";
  } else if (
    normalizedRole === "admin" ||
    normalizedRole === "tpo" ||
    normalizedRole === "tpo/admin"
  ) {
    currentRole = "admin";
  }

  const items = menuItems[currentRole];

  const roleName = {
    student: "Student",
    recruiter: "Recruiter",
    admin: "TPO / Admin",
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg bg-indigo-600 p-1.5
         text-white shadow-lg lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-blue-950 shrink-0
             text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen
              lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <GraduationCap size={36} className="text-blue-400" />

            <div>
              <h2 className="text-xl font-bold">Campus</h2>
              <p className="text-sm tracking-wide font-semibold text-blue-200">
                Placement Portal
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden hover:bg-white/20 rounded-lg"
            aria-label="Close sidebar"
          >
            <X size={26} />
          </button>
        </div>

        {/* User role */}
        <div className="border-b border-white/50 px-5 py-5">
          <p className="text-md text-slate-200">Logged in as</p>
          <p className="mt-1 text-md font-semibold">{roleName[currentRole]}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5">
          {items.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== `/${currentRole}` &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 
                    text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-blue-100 hover:bg-white/20 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/60 p-4">
          <button
            onClick={() => {
              // Connect your logout function here
              console.log("Logout clicked");
            }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-md font-semibold
             text-blue-100 transition hover:bg-red-600"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}