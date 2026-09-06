import { champions } from "~~/shared/data/champions";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid champion slug",
    });
  }

  const champion = champions.find((item) => item.slug === slug);

  if (!champion) {
    throw createError({
      statusCode: 404,
      statusMessage: "Champion not found",
    });
  }

  return champion;
});
