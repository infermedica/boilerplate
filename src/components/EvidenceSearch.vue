<template>
  <EvidenceSearchComponent 
    v-model="phrase"
    :results="results"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSearch } from '@/composables';
import EvidenceSearchComponent from '@/components/EvidenceSearchComponent.vue'
import type { SearchResultType } from '@/composables/types';

const age = ref(32);
const phrase = ref('');
const maxResults = ref(10);
const results = ref<SearchResultType[] | null>([]);

watch(phrase, async (value) => {

  if (!value) {
    results.value = null;
    return;
  };
  
  const { observations } = await useSearch({
    phrase: value, 
    age: {
      value: age.value,
    }, 
    maxResults: maxResults.value,
  });

  results.value = observations;
});

</script>
