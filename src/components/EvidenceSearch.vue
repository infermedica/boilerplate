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
import SearchComponent from '@/components/SearchComponent.vue';
import {
  useSearch,
  type SearchResultType,
} from '@/services';

const age = ref(32);
const phrase = ref('');
const maxResults = ref(10);
const results = ref<SearchResultType[] | null>([]);
const search = computed({
  get: () => (phrase.value),
  set: async (value) => {
    phrase.value = value;

    if (!phrase.value) results.value = null;

    if (phrase.value) {
      const { observations } = await useSearch({
        phrase: phrase.value,
        age: {
          value: age.value,
        },
        maxResults: maxResults.value,
      });

      results.value = observations;
    }
  },
});

</script>
