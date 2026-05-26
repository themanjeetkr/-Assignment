import { api } from "@/services/api";
import type { SavedCollege } from "@/types";

export async function getSavedColleges() {
  const { data } = await api.get<{ data: SavedCollege[] }>("/saved");
  return data.data;
}

export async function saveCollege(collegeId: number) {
  const { data } = await api.post<SavedCollege>("/saved", { collegeId });
  return data;
}

export async function removeSavedCollege(collegeId: number) {
  const { data } = await api.delete(`/saved/${collegeId}`);
  return data;
}
