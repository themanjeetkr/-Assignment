"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuth, getUser, isAuthenticated } from "@/lib/auth";
import type { User } from "@/types";

const navLinks = [
  { href: "/colleges", label: "Colleges" },
  { href: "/compare", label: "Compare" },
  { href: "/saved", label: "Saved" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const syncUser = () => setUser(getUser());
    syncUser();
    window.addEventListener("auth:changed", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth:changed", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  function handleLogout() {
    clearAuth();
    setUser(null);
    window.dispatchEvent(new Event("auth:changed"));
    router.push("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/colleges" className="text-lg font-bold text-slate-950">
          College Compare
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                pathname.startsWith(link.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated() || user ? (
            <button
              onClick={handleLogout}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Logout{user ? ` (${user.name})` : ""}
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
