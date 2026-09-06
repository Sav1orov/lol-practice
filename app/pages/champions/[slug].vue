<script setup lang="ts">
import { champions } from "~~/shared/data/champions";

const route = useRoute();
const slug = route.params.slug;

const champion = champions.find((item) => item.slug === slug);
</script>

<template>
  {{ champion.name }}
  {{ champion.role }}
  {{ champion.difficulty }}
  {{ champion.summary }}

  <NuxtLink class="back-link" to="/champions">← Back to champions</NuxtLink>
</template>
