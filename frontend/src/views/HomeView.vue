<script setup lang="ts">
</script>

<template>
  <section class="home">
    <h1>Petclinic</h1>

    <p class="subtitle">
      Application de gestion des clients et animaux d’une clinique vétérinaire.
    </p>

    <div class="actions">
      <RouterLink to="/owners" class="card">
        <h2>Owners</h2>
        <p>Consulter et gérer les propriétaires</p>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.home {
  max-width: 800px;
}

.subtitle {
  margin: 0.5rem 0 2rem;
  color: #555;
}

.actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
}

.card:hover {
  background: #f6f6f6;
}
</style>
