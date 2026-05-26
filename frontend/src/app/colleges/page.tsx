"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CollegeCard } from "@/components/CollegeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getErrorMessage } from "@/lib/format";
import { isAuthenticated } from "@/lib/auth";
import { getColleges } from "@/services/colleges";
import { saveCollege } from "@/services/saved";
import type { College } from "@/types";

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    async function loadColleges() {
      try {
        const response = await getColleges();
        setColleges(response.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    loadColleges();
  }, []);

  const compareHref = useMemo(() => {
    if (selectedIds.length !== 2) return null;
    return `/compare?id1=${selectedIds[0]}&id2=${selectedIds[1]}`;
  }, [selectedIds]);

  function handleCompare(college: College) {
    setSelectedIds((current) => {
      if (current.includes(college.id)) return current.filter((id) => id !== college.id);
      return [...current.slice(-1), college.id];
    });
  }

  async function handleSave(college: College) {
    if (!isAuthenticated()) {
      setNotice("Login first to save colleges.");
      return;
    }

    setSavingId(college.id);
    setNotice(null);

    try {
      await saveCollege(college.id);
      setNotice(`${college.name} saved successfully.`);
    } catch (err) {
      setNotice(getErrorMessage(err));
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <LoadingSpinner label="Loading colleges..." />;

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Colleges</h1>
          <p className="mt-2 text-slate-600">
            Browse colleges from the NestJS API. Sample colleges are shown if the database is empty.
          </p>
        </div>
        {compareHref ? (
          <Link
            href={compareHref}
            className="w-fit rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Compare selected
          </Link>
        ) : (
          <span className="text-sm text-slate-500">Select two colleges to compare.</span>
        )}
      </div>

      {notice ? (
        <div className="mt-5 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
          {notice}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4">
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            compareSelected={selectedIds.includes(college.id)}
            saving={savingId === college.id}
            onCompare={handleCompare}
            onSave={handleSave}
          />
        ))}
      </div>
    </section>
  );
}
