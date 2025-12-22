<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/auth/auth'

const router = useRouter()
const { isAuthenticated, logout } = useAuth()

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <header class="app-header">
    <nav>
      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/owners">Owners</RouterLink>
      </div>
      <button v-if="isAuthenticated" @click="handleLogout" class="logout-btn">
        Logout
      </button>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background-color: #e85a5a;
}
</style>
