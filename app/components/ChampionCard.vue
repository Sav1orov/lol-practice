<script setup lang="ts">
import type { IChampion } from "~~/shared/types/champion";

const props = defineProps<{
  champion: IChampion;
}>();

const emit = defineEmits<{
  toggleFavorite: [slug: string];
}>();
</script>

<template>
  <NuxtLink :to="`/champions/${champion.slug}`">
    {{ champion.name }}
  </NuxtLink>

  {{ champion.role }}
  {{ champion.difficulty }}
  {{ champion.summary }}

  <button type="button" @click="emit('toggleFavorite', champion.slug)">
    Add to favorites
  </button>
</template>
