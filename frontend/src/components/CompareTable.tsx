import { formatCurrency } from "@/lib/format";
import type { College } from "@/types";

type CompareTableProps = {
  colleges: College[];
};

const labels: Array<{ label: string; render: (college: College) => string }> = [
  { label: "Location", render: (college) => college.location },
  { label: "Rating / Ranking", render: (college) => String(college.rating) },
  { label: "Fees", render: (college) => formatCurrency(college.fees) },
  { label: "Placements", render: (college) => college.placements },
  { label: "Courses", render: (college) => college.courses.join(", ") },
  { label: "Overview", render: (college) => college.overview },
];

export function CompareTable({ colleges }: CompareTableProps) {
  if (colleges.length !== 2) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Choose exactly two colleges to compare.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-44 px-4 py-3 text-left font-semibold text-slate-600">Field</th>
              {colleges.map((college) => (
                <th key={college.id} className="min-w-64 px-4 py-3 text-left font-semibold text-slate-950">
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {labels.map((row) => (
              <tr key={row.label}>
                <td className="bg-slate-50 px-4 py-3 font-medium text-slate-600">{row.label}</td>
                {colleges.map((college) => (
                  <td key={`${college.id}-${row.label}`} className="px-4 py-3 text-slate-800">
                    {row.render(college)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
