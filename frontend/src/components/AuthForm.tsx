"use client";

import { FormEvent, useState } from "react";

type AuthFormProps = {
  mode: "login" | "signup";
  loading: boolean;
  error: string | null;
  onSubmit: (values: { name?: string; email: string; password: string }) => void;
};

export function AuthForm({ mode, loading, error, onSubmit }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ name, email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" ? (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            placeholder="Manjeet Singh"
          />
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          placeholder="manjeet@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          placeholder="Minimum 6 characters"
        />
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
      </button>
    </form>
  );
}
