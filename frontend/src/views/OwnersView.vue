<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getOwnersPage } from "@/api"
import OwnersTable from '@/components/owners/OwnersTable.vue'
import type { Owner } from '@/types/Owner.ts'

const owners = ref<Owner[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const page = ref(0)
const size = ref(2)
const totalPages = ref(0)
const totalElements = ref(0)
const lastName = ref('')

async function fetchOwners() {
  loading.value = true
  error.value = null
  try {
    const response = await getOwnersPage(page.value, size.value, lastName.value || undefined)
    owners.value = response.content
    totalPages.value = response.totalPages
    totalElements.value = response.totalElements
  } catch (e) {
    error.value = e instanceof Error
      ? e.message
      : 'Impossible de charger les propriétaires'
  } finally {
    loading.value = false
  }
}

function goToPage(newPage: number) {
  if (newPage >= 0 && newPage < totalPages.value) {
    page.value = newPage
    fetchOwners()
  }
}

function search() {
  page.value = 0
  fetchOwners()
}

onMounted(() => {
  fetchOwners()
});
</script>

<template>
  <section>
    <h1>Owners</h1>

    <div class="search-section">
      <input
        v-model="lastName"
        type="text"
        placeholder="Search by last name..."
        @keyup.enter="search"
      />
      <button @click="search">Search</button>
    </div>

    <p v-if="loading">Chargement...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <template v-else>
      <OwnersTable :owners="owners" />

      <div class="pagination">
        <div class="pagination-info">
          Showing {{ owners.length }} of {{ totalElements }} owners
          (Page {{ page + 1 }} of {{ totalPages }})
        </div>
        <div class="pagination-controls">
          <button @click="goToPage(page - 1)" :disabled="page === 0">
            Previous
          </button>
          <button @click="goToPage(page + 1)" :disabled="page >= totalPages - 1">
            Next
          </button>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.search-section {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}

.search-section input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-section button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-section button:hover {
  background-color: #359268;
}

.error {
  color: #f56c6c;
  padding: 0.5rem;
  background-color: #fef0f0;
  border-radius: 4px;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-info {
  color: #666;
}

.pagination-controls {
  display: flex;
  gap: 0.5rem;
}

.pagination-controls button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-controls button:hover:not(:disabled) {
  background-color: #359268;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
