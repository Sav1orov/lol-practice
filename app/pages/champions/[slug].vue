<script setup lang="ts">
import { champions } from "~~/shared/data/champions";

const route = useRoute();
const slug = route.params.slug;

const champion = champions.find((item) => item.slug === slug);

const selectedStyle = ref("safe");

const selectedBuild = computed(() => {
  return champion?.builds.find((build) => {
    return build.style === selectedStyle.value;
  });
});

if (!champion) {
  throw createError({
    statusCode: 404,
    statusMessage: "Champion not found",
  });
}
</script>

<template>
  <br />
  {{ champion.name }}
  <br />
  {{ champion.role }}
  <br />
  {{ champion.difficulty }}
  <br />
  {{ champion.summary }}
  <br />

  <select v-model="selectedStyle">
    <option value="" disabled selected>Choose playstyle</option>
    <option
      v-for="build in champion.builds"
      :value="build.style"
      :key="build.style"
    >
      {{ build.style }}
    </option>
  </select>
  <br />
  <section v-if="selectedBuild">
    <h2>{{ selectedBuild.primaryPath }}</h2>

    <div v-for="rune in selectedBuild.primaryRunes" :key="rune">
      {{ rune }}
    </div>

    <h2>{{ selectedBuild.secondaryPath }}</h2>
    <div v-for="rune in selectedBuild.secondaryRunes" :key="rune">
      {{ rune }}
    </div>

    <h2>Sumoner Spells:</h2>
    <div v-for="spells in selectedBuild.summonerSpells" :key="spells">
      {{ spells }}
    </div>
  </section>

  <NuxtLink class="back-link" to="/champions"> ← Back to champions</NuxtLink>
</template>
