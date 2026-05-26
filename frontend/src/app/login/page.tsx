"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { setAuth } from "@/lib/auth";
import { getErrorMessage } from "@/lib/format";
import { login } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(values: { email: string; password: string }) {
    setLoading(true);
    setError(null);

    try {
      const response = await login(values);
      setAuth(response.accessToken, response.user);
      window.dispatchEvent(new Event("auth:changed"));
      router.push("/colleges");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-950">Login</h1>
      <p className="mt-2 text-sm text-slate-600">Use your API account to save colleges.</p>

      <div className="mt-6">
        <AuthForm mode="login" loading={loading} error={error} onSubmit={handleLogin} />
      </div>

      <p className="mt-5 text-sm text-slate-600">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-brand-700 hover:underline">
          Create an account
        </Link>
      </p>
    </section>
  );
}
