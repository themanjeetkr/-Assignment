"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatCurrency, getErrorMessage } from "@/lib/format";
import { getCollege } from "@/services/colleges";
import type { College } from "@/types";

export default function CollegeDetailsPage() {
  const params = useParams<{ id: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCollege() {
      try {
        const response = await getCollege(params.id);
        setCollege(response);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    loadCollege();
  }, [params.id]);

  if (loading) return <LoadingSpinner label="Loading college details..." />;

  if (error || !college) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error ?? "College not found."}
      </div>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <Link href="/colleges" className="text-sm font-semibold text-brand-700 hover:underline">
        Back to colleges
      </Link>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">{college.name}</h1>
          <p className="mt-2 text-slate-600">{college.location}</p>
        </div>
        <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          Rating {college.rating}
        </span>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <DetailBlock label="Fees" value={formatCurrency(college.fees)} />
        <DetailBlock label="Placements" value={college.placements} />
        <DetailBlock label="Overview" value={college.overview} />
        <DetailBlock label="Courses" value={college.courses.join(", ")} />
      </div>
    </section>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-slate-900">{value}</p>
    </div>
  );
}
