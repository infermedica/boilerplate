<template>
  <UiFormField
    class="evidence-search"
  >
    <UiDropdown
      ref="dropdown"
      class="ui-dropdown--compact evidence-search__dropdown"
      :toggle-element="inputElement"
      @update:model-value="updateHandler"
      @open="handleDropdownOpened"
      @close="handleDropdownClosed"
    >
      <template #toggle="provideData">
        <UiInput 
          id="evidence-search"
          ref="dropdowntoggle"
          :model-value="searchQuery"
          v-bind="inputAttrs"
          autocomplete="off"
          role="combobox"
          class="ui-input--has-icon evidence-search__input"
          @update:model-value="inputHandler($event, provideData.openHandler, provideData.closeHandler)"
        >
          <template #aside>
            <UiButton
              v-if="hasSearchQuery"
              tabindex="-1"
              class="ui-button--text ui-button--secondary ui-button--has-icon ui-input__aside evidence-search__search-icon"
              aria-label="Clear"
              @click="inputHandler('', provideData.openHandler, provideData.closeHandler)"
            >
              <UiIcon icon="clear" />
            </UiButton>
            <UiIcon
              v-else
              icon="search"
              class="ui-input__aside evidence-search__search-icon"
            />
          </template>
        </UiInput>
      </template>
      <template #content>
        <UiLoader
          :is-loading="isLoading"
          type="skeleton"
          class="evidence-search__loader"
        >
          <div
            v-if="hasResults"
            id="evidence-results"
            role="listbox"
            class="evidence-search__results"
          >
            <UiDropdownItem
              v-for="(result, position) in filteredResults"
              :key="result.id"
              :value="{ ...result, position, origin: 'searchbar' }"
              role="option"
              :aria-setsize="filteredResults.length"
              :aria-posinset="position + 1"
              tabindex="-1"
            >
              <span
                v-highlight="searchQuery"
                class="evidence-search__highlighted"
              >{{ result.label }}</span>
            </UiDropdownItem>
          </div>
        </UiLoader>
      </template>
    </UiDropdown>
  </UiFormField>
</template>

<script setup lang="ts">
import { 
  computed,
  ref,
 } from 'vue';
 import type {
  ComponentPublicInstance,
  ComputedRef,
} from 'vue';
import { highlight as vHighlight } from '@infermedica/component-library/src/utilities/directives/index.ts';
import { 
  UiButton, 
  UiDropdown, 
  UiFormField,
  UiIcon,
  UiInput,
  UiLoader,
} from '@infermedica/component-library';
import UiDropdownItem from '@infermedica/component-library/src/components/molecules/UiDropdown/_internal/UiDropdownItem.vue';
import { useSearchSymptoms } from '@/composables/useSearchSymptoms';
import type { DropdownModelValue } from '@infermedica/component-library';
import type { SearchResult } from '@/composables/types/index';
type EvidenceSearchProps = {
  modelValue: DropdownModelValue[] | [],
  evidenceIds?: string[],
  maxResults?: number,
}
const props = withDefaults(defineProps<EvidenceSearchProps>(), {
  modelValue: () => ([]),
  evidenceIds: () => ([]),
  maxResults: 100,
})
const emit = defineEmits(['update:modelValue']);
const searchQuery = ref('');
const dropdowntoggle = ref<ComponentPublicInstance<HTMLInputElement>>();
const isDropdownOpened = ref(false);
const handleDropdownOpened = () => {
  isDropdownOpened.value = true;
};
const handleDropdownClosed = () => {
  isDropdownOpened.value = false;
};
const hasSearchQuery = computed(() => (searchQuery.value.length > 0));
const inputAttrs = computed(() => ({
  placeholder: 'Search, e.g., headache',
}));
const inputElement = computed(() => dropdowntoggle.value?.$el.querySelector('input'));
const isLoading = ref(false);
const searchResults = ref<SearchResult[] | []>([]);
const filteredResults: ComputedRef<SearchResult[]> = computed(() => (
  searchResults.value
    .filter((result: SearchResult) => (!props.evidenceIds.includes(result.id)))
));
const hasResults = computed(() => (filteredResults.value.length > 0));
function updateHandler(value: DropdownModelValue) {
  emit('update:modelValue', [...props.modelValue, value]);
  searchQuery.value = '';
}
async function inputHandler(
  value: string, 
  open: () => void, 
  close: () => void
  ) {
  const inputValueTrimmed = value.trim();
  
  if (searchQuery.value === inputValueTrimmed) return;
  
  if (inputValueTrimmed.length > 0) {
    open();
    searchQuery.value = inputValueTrimmed;
    const { data } = await useSearchSymptoms({
      phrase: value, 
      age: 32, 
      maxResults: props.maxResults,
    })
    searchResults.value = data.value;
    
  } else if (inputValueTrimmed.length < 1) {
    close();
    searchQuery.value = '';
    searchResults.value = [];
  }
}
</script>

<style lang="scss">
.evidence-search {
  --evidence-search-width: 28.75rem;
  
  width: var(--evidence-search-width);
  margin-top: var(--space-16);
  &__dropdown {
    --dropdown-popover-max-width: var(--evidence-search-width);
    --popover-content-padding: var(--evidence-search-popover-content-padding, 0);
    --dropdown-popover-min-height: var(--evidence-search-dropdown-popover-min-height, 8rem);
    position: var(--evidence-search-position, relative);
    width: 100%;
  }
  &__input {
    width: var(--evidence-search-input-width, 100%);
  }
  &__search-icon {
    --icon-color: var(--evidence-search-icon-color, var(--color-icon-primary));
  }
  &__highlighted {
    font: var(--evidence-search-highlighted-font, var(--font-body-1));
    &::first-letter {
      text-transform: uppercase;
    }
    mark {
      font: var(--evidence-search-highlighted-mark-font, var(--font-body-1-thick));
      color: var(--evidence-search-highlighted-mark-color, inherit);
      background: var(--evidence-search-highlighted-mark-background, transparent);
    }
  }
  &__results {
    padding: var(--evidence-search-results-padding, var(--space-8));
  }
  .ui-dropdown-item {
    width: 100%;
  }
}
</style>
