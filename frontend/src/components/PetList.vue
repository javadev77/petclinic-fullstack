<script setup lang="ts">
import type { Pet } from '@/types/Pet'

defineProps<{
  pets: Pet[]
}>()
</script>

<template>
  <ul>
    <li v-for="pet in pets" :key="pet.id">
      <strong>{{ pet.name }}</strong>
      — {{ pet.type.name }}
      — {{ pet.birthDate }}
    </li>
  </ul>
</template>

<style scoped>

</style>
