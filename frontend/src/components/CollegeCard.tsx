"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import type { College } from "@/types";

type CollegeCardProps = {
  college: College;
  onCompare?: (college: College) => void;
  onSave?: (college: College) => void;
  saving?: boolean;
  compareSelected?: boolean;
};

export function CollegeCard({
  college,
  onCompare,
  onSave,
  saving = false,
  compareSelected = false,
}: CollegeCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href={`/colleges/${college.id}`} className="text-lg font-semibold text-slate-950 hover:text-brand-700">
            {college.name}
          </Link>
          <p className="mt-1 text-sm text-slate-600">{college.location}</p>
        </div>
        <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          Rating {college.rating}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="text-slate-500">Fees</p>
          <p className="font-semibold text-slate-900">{formatCurrency(college.fees)}</p>
        </div>
        <div>
          <p className="text-slate-500">Placements</p>
          <p className="font-medium text-slate-800">{college.placements}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCompare?.(college)}
          className={`rounded-md px-3 py-2 text-sm font-semibold ${
            compareSelected
              ? "bg-brand-600 text-white hover:bg-brand-700"
              : "border border-slate-300 text-slate-700 hover:bg-slate-100"
          }`}
        >
          {compareSelected ? "Selected" : "Compare"}
        </button>
        <button
          type="button"
          onClick={() => onSave?.(college)}
          disabled={saving}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <Link
          href={`/colleges/${college.id}`}
          className="rounded-md px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
