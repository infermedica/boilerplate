<template>
  <EvidenceSearch 
    v-model="initialEvidences"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EvidenceSearch from './components/EvidenceSearch.vue'

const initialEvidences = ref([]);
</script>
