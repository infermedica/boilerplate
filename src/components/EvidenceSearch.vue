<template>
  <SearchComponent 
    v-model="search"
    :results="results"
  />
</template>

<script setup lang="ts">
import { 
  computed,
  ref, 
} from 'vue';
import { useSearch } from '@/composables';
import SearchComponent from '@/components/SearchComponent.vue'
import type { SearchResultType } from '@/composables/types';

const age = ref(32);
const phrase = ref('');
const maxResults = ref(10);
const results = ref<SearchResultType[] | null>([]);
const search = computed({
  get: () => (phrase.value),
  set: async (value) => {
    phrase.value = value;

    if (!phrase.value) {
      results.value = null;
    }

    const { observations } = await useSearch({
      phrase: phrase.value, 
      age: {
        value: age.value,
      }, 
      maxResults: maxResults.value,
    });

    results.value = observations;

  }
});

</script>
