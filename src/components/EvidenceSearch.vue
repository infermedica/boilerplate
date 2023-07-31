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
import { results } from './results.ts';
import type { DropdownHandlersOptions, DropdownModelValue } from '@infermedica/component-library';
import UiDropdownItem from '@infermedica/component-library/src/components/molecules/UiDropdown/_internal/UiDropdownItem.vue';

type Result = {
  id: string, 
  label: string
}

type EvidenceSearchProps = {
  modelValue: DropdownModelValue[] | [],
  evidenceIds?: string[],
  resultsMax?: number,
}

const props = withDefaults(defineProps<EvidenceSearchProps>(), {
  modelValue: () => ([]),
  evidenceIds: () => ([]),
  resultsMax: 7
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
const searchResults = ref<Result[] | []>([]);
const filteredResults: ComputedRef<Result[]> = computed(() => (
  searchResults.value
    .filter((result: Result) => (!props.evidenceIds.includes(result.id)))
    .slice(0, props.resultsMax)
));
const hasResults = computed(() => (filteredResults.value.length > 0));

const fetchHandler = (_value: string) => {
  searchResults.value = results;
  isLoading.value = false;
}

function updateHandler(value: DropdownModelValue) {
  emit('update:modelValue', [...props.modelValue, value]);

  searchQuery.value = '';
}

function inputHandler(
  value: string, 
  open: ({ focus }?: DropdownHandlersOptions) => Promise<void>, 
  close: ({ focusToggle }?: DropdownHandlersOptions) => void
  ) {
  if (value.length > 0) {
    open();
  } else if (value.length < 1) {
    close();
  }
  searchQuery.value = value;
  isLoading.value = true;
  fetchHandler(value);
}

// async function inputHandler(value, open, close) {
//   if (value.length > 0) {
//     open();
//   } else if (value.length < 1) {
//     close();
//   }
//   searchQuery.value = value;
//   isLoading.value = true;
//   fetchHandler(value);
// }
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
