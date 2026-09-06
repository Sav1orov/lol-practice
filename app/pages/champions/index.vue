<script setup lang="ts">
import { champions } from "~~/shared/data/champions";

function handleToggleFavorite(slug: string) {
  console.log("favorite added: ", slug);
}
</script>

<template>
  <ChampionCard
    v-if="champions[0]"
    :champion="champions[0]"
    @toggle-favorite="handleToggleFavorite"
  />
</template>
