"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { formatCurrency, getErrorMessage } from "@/lib/format";
import { getSavedColleges, removeSavedCollege } from "@/services/saved";
import type { SavedCollege } from "@/types";

export default function SavedPage() {
  return (
    <ProtectedRoute>
      <SavedContent />
    </ProtectedRoute>
  );
}

function SavedContent() {
  const [saved, setSaved] = useState<SavedCollege[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadSaved() {
    try {
      const response = await getSavedColleges();
      setSaved(response);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSaved();
  }, []);

  async function handleRemove(collegeId: number) {
    setRemovingId(collegeId);
    setError(null);

    try {
      await removeSavedCollege(collegeId);
      setSaved((current) => current.filter((item) => item.college.id !== collegeId));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setRemovingId(null);
    }
  }

  if (loading) return <LoadingSpinner label="Loading saved colleges..." />;

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-950">Saved Colleges</h1>
      <p className="mt-2 text-slate-600">Protected API data loaded with your JWT token.</p>

      {error ? (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {saved.length === 0 ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-700">
          No saved colleges yet.{" "}
          <Link href="/colleges" className="font-semibold text-brand-700 hover:underline">
            Browse colleges
          </Link>
          .
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {saved.map(({ id, college }) => (
            <article key={id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Link href={`/colleges/${college.id}`} className="text-lg font-semibold text-slate-950 hover:text-brand-700">
                    {college.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">{college.location}</p>
                  <p className="mt-3 text-sm text-slate-700">
                    {formatCurrency(college.fees)} · Rating {college.rating}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={removingId === college.id}
                  onClick={() => handleRemove(college.id)}
                  className="w-fit rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {removingId === college.id ? "Removing..." : "Remove"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
