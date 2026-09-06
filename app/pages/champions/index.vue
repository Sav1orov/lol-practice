<script setup lang="ts">
import { champions } from "~~/shared/data/champions";

function handleToggleFavorite(slug: string) {
  console.log("favorite added: ", slug);
}

const searchQuery = ref("");
const selectedRole = ref("");

const filteredChampions = computed(() => {
  const normalizedString = searchQuery.value.trim().toLowerCase();

  return champions.filter((champion) => {
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

  <div v-if="!champions.length">
    <h1>Error!</h1>
  </div>

  <ChampionCard
    v-else
    v-for="champion in filteredChampions"
    :key="champion.id"
    :champions="champion"
    @toggle-favorite="handleToggleFavorite"
  />
</template>
