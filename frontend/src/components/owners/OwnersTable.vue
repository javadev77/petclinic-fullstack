<script setup lang="ts">
import type { Owner } from '@/types/Owner.ts'
import { RouterLink } from 'vue-router'

defineProps<{
  owners: Owner[]
}>()
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>First name</th>
      <th>Last name</th>
      <th>City</th>
      <th>Telephone</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="owner in owners" :key="owner.id">
      <td>
        <RouterLink
          :to="`/owners/${owner.id}`"
          class="owner-link"
        >
          {{ owner.firstName }}
        </RouterLink>
      </td>
      <td>{{ owner.lastName }}</td>
      <td>{{ owner.city }}</td>
      <td>{{ owner.telephone }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

.owner-link {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.owner-link:hover {
  text-decoration: underline;
}

</style>
