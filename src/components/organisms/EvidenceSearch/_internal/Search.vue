<template>
  <UiFormField
    class="search"
  >
    <UiDropdown
      ref="dropdown"
      class="ui-dropdown--compact search__dropdown"
      :toggle-element="inputElement"
      @update:model-value="updateHandler"
      @open="handleDropdownOpened"
      @close="handleDropdownClosed"
    >
      <template #toggle="provideData">
        <UiInput
          id="search"
          ref="dropdowntoggle"
          :model-value="modelValue"
          v-bind="inputAttrs"
          autocomplete="off"
          role="combobox"
          class="ui-input--has-icon search__input"
          @update:model-value="inputHandler($event, provideData.openHandler, provideData.closeHandler)"
        >
          <template #aside>
            <UiButton
              v-if="hasSearchQuery"
              tabindex="-1"
              class="ui-button--text ui-button--secondary ui-button--has-icon ui-input__aside search__search-icon"
              aria-label="Clear"
              @click="inputHandler('', provideData.openHandler, provideData.closeHandler)"
            >
              <UiIcon icon="clear" />
            </UiButton>
            <UiIcon
              v-else
              icon="search"
              class="ui-input__aside search__search-icon"
            />
          </template>
        </UiInput>
      </template>
      <template #content>
        <UiLoader
          :is-loading="isLoading"
          type="skeleton"
          class="search__loader"
        >
          <div
            v-if="hasResults"
            id="results"
            role="listbox"
            class="search__results"
          >
            <UiDropdownItem
              v-for="(result, position) in filteredResults"
              :key="result.id"
              :value="{ ...result, position, origin: 'searchbar' }"
              role="option"
              :aria-setsize="filteredResults.length"
              :aria-posinset="position + 1"
              tabindex="-1"
              class="search__button"
            >
              <span
                v-highlight="modelValue"
                class="search__highlighted"
              >{{ result.label }}</span>
            </UiDropdownItem>
          </div>

          <SearchNoResult
            v-else
          />
        </UiLoader>
      </template>
    </UiDropdown>
  </UiFormField>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  type ComponentPublicInstance,
  type ComputedRef,
} from 'vue';
import {
  UiButton,
  UiDropdown,
  UiFormField,
  UiIcon,
  UiInput,
  UiLoader,
} from '@infermedica/component-library';
import { highlight as vHighlight } from '@infermedica/component-library/src/utilities/directives';
import UiDropdownItem from '@infermedica/component-library/src/components/molecules/UiDropdown/_internal/UiDropdownItem.vue';
import SearchNoResult from '@/components/SearchNoResult.vue';
import type { SearchResultType } from '@/services';

type EvidenceSearchProps = {
  modelValue: string;
  results: SearchResultType[] | null;
  evidenceIds?: string[];
};

type EvidenceSearchEmits = {
  (e: 'update:modelValue', value: string): void;
};

const props = withDefaults(defineProps<EvidenceSearchProps>(), {
  evidenceIds: () => ([]),
  maxResults: 10,
});

const emit = defineEmits<EvidenceSearchEmits>();

const dropdowntoggle = ref<ComponentPublicInstance<HTMLInputElement>>();
const isDropdownOpened = ref(false);
const handleDropdownOpened = () => {
  isDropdownOpened.value = true;
};
const handleDropdownClosed = () => {
  isDropdownOpened.value = false;
};
const hasSearchQuery = computed(() => (props.modelValue.length > 0));
const inputAttrs = computed(() => ({
  placeholder: 'Search, e.g., headache',
}));
const inputElement = computed(() => dropdowntoggle.value?.$el.querySelector('input'));
const isLoading = ref(false);
const filteredResults: ComputedRef<SearchResultType[] | []> = computed(() => (
  props.results !== null
    ? props.results?.filter((result: SearchResultType) => (!props.evidenceIds.includes(result.id)))
    : []
));
const hasResults = computed(() => (filteredResults.value.length > 0));
function updateHandler() {
  emit('update:modelValue', '');
}
async function inputHandler(
  value: string,
  open: () => void,
  close: () => void,
) {
  const inputValueTrimmed = value.trim();

  if (props.modelValue === inputValueTrimmed) return;

  if (inputValueTrimmed.length > 0) {
    open();
    emit('update:modelValue', inputValueTrimmed);
  } else if (inputValueTrimmed.length < 1) {
    close();
    emit('update:modelValue', '');
  }
}
</script>

<style lang="scss">
.search {
  --search-width: 440px;

  margin-top: var(--space-16);

  &__dropdown {
    --dropdown-popover-max-width: var(--search-width);
    --popover-content-padding: var(--search-popover-content-padding, 0);
    --dropdown-popover-min-height: var(--search-dropdown-popover-min-height, 8rem);

    position: var(--evidence-search-position, relative);
    width: 100%;
  }

  &__input {
    width: var(--search-input-width, var(--search-width));
  }

  &__search-icon {
    --icon-color: var(--evidence-search-icon-color, var(--color-icon-primary));
  }

  &__button {
    text-align: start;
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
