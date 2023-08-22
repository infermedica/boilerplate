<template>
  <EvidenceSearch :age="age"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EvidenceSearch from './components/EvidenceSearch.vue'

const age = ref(32);
</script>
