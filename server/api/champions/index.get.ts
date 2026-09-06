import { champions } from "~~/shared/data/champions";

export default defineEventHandler((event) => {
  const query = getQuery(event);

  const search = String(query.search ?? "")
    .trim()
    .toLowerCase();

  const role = String(query.role ?? "")
    .trim()
    .toLowerCase();

  return champions.filter((champion) => {
    const matchesSearch =
      !search || champion.name.trim().toLowerCase().includes(search);
    const matchesRole = !role || champion.role === role;

    return matchesSearch && matchesRole;
  });
});
