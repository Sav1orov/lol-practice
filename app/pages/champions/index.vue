<script setup lang="ts">
import { champions } from "~~/shared/data/champions";

function handleToggleFavorite(slug: string) {
  console.log("favorite added: ", slug);
}
</script>

<template>
  <div v-if="!champions.length">
    <h1>Error!</h1>
  </div>

  <ChampionCard
    v-else
    v-for="champion in champions"
    :key="champion.id"
    :champions="champion"
    @toggle-favorite="handleToggleFavorite"
  />
</template>
