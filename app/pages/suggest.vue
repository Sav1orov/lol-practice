<script setup lang="ts">
import type { ISuggestionResponse } from "~~/shared/types/suggestion";
import type { TPlayStyle } from "~~/shared/types/champion";

const championName = ref("");
const selectedStyle = ref<TPlayStyle>("standard");
const explanation = ref("");

const isSubmitting = ref(false);
const feedback = ref("");
const hasError = ref(false);

async function submitSuggestion() {
  isSubmitting.value = true;
  feedback.value = "";
  hasError.value = false;

  try {
    const result = await $fetch<ISuggestionResponse>("/api/suggestions", {
      method: "POST",
      body: {
        championName: championName.value,
        style: selectedStyle.value,
        explanation: explanation.value,
      },
    });

    feedback.value = `Suggestion for "${result.championName}" accepted. ID: ${result.id}`;
    championName.value = "";
    selectedStyle.value = "standard";
    explanation.value = "";
  } catch (error: unknown) {
    const requestError = error as {
      data?: {
        statusMessage?: string;
      };
    };

    hasError.value = true;
    feedback.value =
      requestError.data?.statusMessage ?? "Could not send suggestion";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <main>
    <h1>Suggest a champion build</h1>

    <form @submit.prevent="submitSuggestion">
      <label for="champion-name">Champion name</label>
      <input
        id="champion-name"
        v-model.trim="championName"
        type="text"
        required
      />

      <label for="play-style">Play style</label>
      <select id="play-style" v-model="selectedStyle">
        <option value="safe">Safe</option>
        <option value="standard">Standard</option>
        <option value="aggressive">Aggressive</option>
      </select>

      <label for="explanation">Explain the build</label>
      <textarea
        id="explanation"
        v-model.trim="explanation"
        required
        minlength="15"
      ></textarea>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Sending..." : "Send suggestion" }}
      </button>
    </form>

    <p v-if="feedback" :class="{ 'status-panel--error': hasError }">
      {{ feedback }}
    </p>
  </main>
</template>
