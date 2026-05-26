import { api } from "@/services/api";
import { dummyColleges, findDummyCollege } from "@/lib/dummy-colleges";
import type { College, PaginatedResponse } from "@/types";

export async function getColleges() {
  try {
    const { data } = await api.get<PaginatedResponse<College>>("/colleges");

    if (data.data.length > 0) {
      return data;
    }
  } catch {
    // Keep the demo usable even when the backend DB has not been seeded yet.
  }

  return {
    data: dummyColleges,
    meta: {
      page: 1,
      limit: dummyColleges.length,
      total: dummyColleges.length,
      totalPages: 1,
    },
  };
}

export async function getCollege(id: string | number) {
  try {
    const { data } = await api.get<College>(`/colleges/${id}`);
    return data;
  } catch {
    const fallback = findDummyCollege(id);
    if (fallback) return fallback;
    throw new Error("College not found.");
  }
}

export async function compareColleges(id1: string | number, id2: string | number) {
  const params = new URLSearchParams();
  params.append("id", String(id1));
  params.append("id", String(id2));

  try {
    const { data } = await api.get<{ colleges: College[] }>(`/compare?${params.toString()}`);
    if (data.colleges.length === 2) return data.colleges;
  } catch {
    // Fall back to local sample data for comparison demos.
  }

  const fallback = [findDummyCollege(id1), findDummyCollege(id2)].filter(Boolean) as College[];
  if (fallback.length === 2) return fallback;

  throw new Error("Choose two valid colleges to compare.");
}
