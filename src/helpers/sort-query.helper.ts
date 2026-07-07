export type SortOrder = "asc" | "desc";

const SORTABLE_FIELDS = new Set(["publishedAt", "createdAt", "updatedAt", "title", "readingTime"]);

export function buildSortStage(
  sortBy = "publishedAt",
  order: SortOrder = "desc",
): Record<string, 1 | -1> {
  const field = SORTABLE_FIELDS.has(sortBy) ? sortBy : "publishedAt";
  return { [field]: order === "asc" ? 1 : -1 };
}
