<script setup lang="ts">
const { data: champions } = await useFetch("/api/champions", {
  default: () => [],
});

const { favoriteSlugs, toggleFavorite, isFavorite } = useFavorites();

const favoriteChampions = computed(() => {
  return champions.value.filter((champion) => {
    return favoriteSlugs.value.includes(champion.slug);
  });
});
</script>

<template>
  <h1>Favorites:</h1>

  <section v-if="!favoriteChampions.length">No favorites yet.</section>
  <ChampionCard
    v-else
    :champions="champion"
    :is-favorite="isFavorite(champion.slug)"
    v-for="champion in favoriteChampions"
    :key="champion.id"
    @toggle-favorite="toggleFavorite"
  />
</template>
