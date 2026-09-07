export function useFavorites() {
  const favoritesCookie = useCookie<string[]>("favorite-slugs", {
    default: () => [],
  });

  function saveFavorites() {
    favoritesCookie.value = [...favoriteSlugs.value];
  }

  const favoriteSlugs = useState<string[]>(
    "favorite-slugs",
    () => favoritesCookie.value,
  );

  function addFavorite(slug: string) {
    if (favoriteSlugs.value.includes(slug)) {
      return;
    }

    favoriteSlugs.value.push(slug);
    saveFavorites();
  }

  function removeFavorite(slug: string) {
    favoriteSlugs.value = favoriteSlugs.value.filter((favoriteSlug) => {
      return favoriteSlug !== slug;
    });
    saveFavorites();
  }

  function isFavorite(slug: string) {
    return favoriteSlugs.value.includes(slug);
  }

  function toggleFavorite(slug: string) {
    if (isFavorite(slug)) {
      removeFavorite(slug);
      return;
    }

    addFavorite(slug);
  }

  return {
    favoriteSlugs,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
