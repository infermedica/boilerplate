<template>
  <UiControls
    :hide-next-button="false"
    :hide-back-button="true"
    :to-back="{ path: '/' }"
    :to-next="{ path: '/' }"
    :invalid="false"
    class="evidence-search"
  >
    <UiHeading class="evidence-search__heading">
      Add your symptoms
    </UiHeading>
    <Search
      v-model="search"
      :results="results"
    />
  </UiControls>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';
import {
  UiHeading,
  UiControls,
} from '@infermedica/component-library';
import Search from './_internal/Search.vue';
import {
  // useSearch,
  useSearchReactive,
  type SearchParamsType,
  type SearchResultType,
} from '@/services';

// const age = ref(32);
// const phrase = ref('');
// const maxResults = ref(10);
const results = ref<SearchResultType[] | null>([]);

const params = ref<SearchParamsType>({
  phrase: '',
  age: {
    value: 32,
  },
});
const search = computed({
  get: () => (params.value.phrase),
  set: async (value) => {
    // phrase.value = value;
    params.value.phrase = value;

    // if (params.value.phrase) {
    // const { observations } = await useSearch({
    //   phrase: params.value.phrase,
    //   age: {
    //     value: age.value,
    //   },
    //   maxResults: maxResults.value,
    // });

    const { observations } = await useSearchReactive(params);
    results.value = observations;
    // }
  },
});
</script>

<style lang="scss">
.evidence-search {
  --evidence-search-height: 46.5rem;
  --evidence-search-width: 100%;

  @media (min-width: 768px) {
    --evidence-search-width: 43.5rem;
  }

  width: var(--evidence-search-width);
  height: var(--evidence-search-height);
  margin: 44px auto;

  &__heading {
    --heading-margin-block-end: var(--space-24)
  }
}
</style>
