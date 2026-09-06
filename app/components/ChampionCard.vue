<script setup lang="ts">
import type { IChampion } from "~~/shared/types/champion";

const props = defineProps<{
  champions: IChampion;
}>();

const emit = defineEmits<{
  toggleFavorite: [slug: string];
}>();
</script>

<template>
  <br />
  <NuxtLink :to="`/champions/${champions.slug}`">
    {{ champions.name }}
  </NuxtLink>
  <br />
  {{ champions.role }}
  <br />
  {{ champions.difficulty }}
  <br />
  {{ champions.summary }}
  <br />
  <button type="button" @click="emit('toggleFavorite', champions.slug)">
    Add to favorites
  </button>
  <br />
</template>
