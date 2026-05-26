"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { setAuth } from "@/lib/auth";
import { getErrorMessage } from "@/lib/format";
import { signup } from "@/services/auth";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(values: { name?: string; email: string; password: string }) {
    setLoading(true);
    setError(null);

    try {
      const response = await signup({
        name: values.name ?? "",
        email: values.email,
        password: values.password,
      });
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
      <h1 className="text-2xl font-bold text-slate-950">Create account</h1>
      <p className="mt-2 text-sm text-slate-600">Signup returns a JWT and logs you in.</p>

      <div className="mt-6">
        <AuthForm mode="signup" loading={loading} error={error} onSubmit={handleSignup} />
      </div>

      <p className="mt-5 text-sm text-slate-600">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-brand-700 hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
}
