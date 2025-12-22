<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getOwnerById } from '@/api/owners'
import PetList from '@/components/PetList.vue'
import type { Owner } from '@/types/Owner'
import { useRoute } from 'vue-router'

const route = useRoute()
const owner = ref<Owner | null>(null)

onMounted(async () => {
  owner.value = await getOwnerById(Number(route.params.id))
})
</script>

<template>
  <div v-if="owner">
    <h1>{{ owner.firstName }} {{ owner.lastName }}</h1>

    <p>
      {{ owner.address }}<br />
      {{ owner.city }}<br />
      📞 {{ owner.telephone }}
    </p>

    <h2>Pets</h2>
    <PetList :pets="owner.pets" />
  </div>
</template>

<style scoped>

</style>
