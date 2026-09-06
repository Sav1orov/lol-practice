<script setup lang="ts">
const route = useRoute();
const slug = String(route.params.slug);

const isInteractive = ref(false);

const {
  data: champion,
  error,
  status,
} = await useFetch(`/api/champions/${slug}`);

const selectedStyle = ref("safe");

const selectedBuild = computed(() => {
  return champion.value?.builds.find((build) => {
    return build.style === selectedStyle.value;
  });
});

onMounted(() => {
  isInteractive.value = true;
});
</script>

<template>
  <p v-if="status === 'pending'" class="status-panel">Loading champions...</p>

  <section v-else-if="error" class="status-panel status-panel--error">
    <h2>Request failed</h2>
    <p>{{ error.message }}</p>
  </section>

  <div v-else-if="champion">
    <br />
    {{ champion.name }}
    <br />
    {{ champion.role }}
    <br />
    {{ champion.difficulty }}
    <br />
    {{ champion.summary }}
    <br />

    <p v-if="!isInteractive">Loading rune selector...</p>
    <select v-model="selectedStyle" :disabled="!isInteractive">
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
  </div>

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
