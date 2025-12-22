<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div id="app">
    <AppHeader />

    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-content {
  padding: 1.5rem;
}
</style>
