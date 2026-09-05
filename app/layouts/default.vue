<script setup lang="ts"></script>

<template>
  <div class="app-shell">
    <nav class="site-nav" aria-label="Основная навигация">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/champions">Champions</NuxtLink>
      <NuxtLink to="/favorites">Favorites</NuxtLink>
    </nav>

    <main>
      <slot />
    </main>

    <footer>by Savi</footer>
  </div>
</template>
