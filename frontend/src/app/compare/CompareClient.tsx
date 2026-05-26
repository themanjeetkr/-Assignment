"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompareTable } from "@/components/CompareTable";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getErrorMessage } from "@/lib/format";
import { compareColleges } from "@/services/colleges";
import type { College } from "@/types";

export function CompareClient() {
  const searchParams = useSearchParams();
  const id1 = searchParams.get("id1");
  const id2 = searchParams.get("id2");
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(Boolean(id1 && id2));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id1 || !id2) return;

    async function loadComparison() {
      setLoading(true);
      setError(null);

      try {
        const response = await compareColleges(id1 as string, id2 as string);
        setColleges(response);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    loadComparison();
  }, [id1, id2]);

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Compare Colleges</h1>
        <p className="mt-2 text-slate-600">Open this page as /compare?id1=1&id2=2 or select colleges from the list.</p>
      </div>

      <div className="mt-6">
        {!id1 || !id2 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-700">
            Choose two colleges from the{" "}
            <Link href="/colleges" className="font-semibold text-brand-700 hover:underline">
              colleges page
            </Link>
            .
          </div>
        ) : loading ? (
          <LoadingSpinner label="Loading comparison..." />
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <CompareTable colleges={colleges} />
        )}
      </div>
    </section>
  );
}
