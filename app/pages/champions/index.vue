<script setup lang="ts">
const {
  data: champions,
  status,
  error,
  refresh,
} = await useFetch("/api/champions", {
  default: () => [],
});

function handleToggleFavorite(slug: string) {
  console.log("favorite added: ", slug);
}

const searchQuery = ref("");
const selectedRole = ref("");

const filteredChampions = computed(() => {
  const normalizedString = searchQuery.value.trim().toLowerCase();

  return champions.value.filter((champion) => {
    const matchesSearch =
      !normalizedString ||
      champion.name.trim().toLowerCase().includes(normalizedString);

    const matchesRole =
      !selectedRole.value || champion.role === selectedRole.value;

    return matchesSearch && matchesRole;
  });
});
</script>

<template>
  <p v-if="status === 'pending'" class="status-panel">Loading champions...</p>

  <section v-else-if="error" class="status-panel status-panel--error">
    <h2>Request failed</h2>
    <p>{{ error.message }}</p>
  </section>

  <div v-else>
    <input
      type="search"
      v-model="searchQuery"
      placeholder="Search champions..."
    />

    <label>Select Champ Role</label>
    <select v-model="selectedRole">
      <option value="" disabled selected>Choose role</option>
      <option value="">all</option>
      <option v-for="champion in champions" :value="champion.role">
        {{ champion.role }}
      </option>
    </select>

    <br />

    <div v-if="!filteredChampions.length">
      <h1>Nothing founded!</h1>
    </div>

    <ChampionCard
      v-else
      v-for="champion in filteredChampions"
      :key="champion.id"
      :champions="champion"
      @toggle-favorite="handleToggleFavorite"
    />
  </div>
</template>
