<template>
  <UiSidePanel
    title="Menu"
    :model-value="isSidePanelOpen"
    class="side-panel"
    @update:model-value="toggleSidePanel"
  >
    <template #content="{ contentAttrs }">
      <div
        v-scroll-tabindex
        v-keyboard-focus
        v-bind="contentAttrs"
        class="ui-side-panel__content side-panel__content"
      >
        <UiMenu
          :items="navigation"
        >
          <template
            v-for="({ text, href }) in navigation"
            :key="text"
          >
            <UiMenuItem
              @click="handleClick(href)"
            >
              {{ text }}
            </UiMenuItem>
          </template>
        </UiMenu>
        <Footer class="side-panel__footer" />
      </div>
    </template>
  </UiSidePanel>
</template>

<script setup lang="ts">
import {
  UiMenu,
  UiSidePanel,
} from '@infermedica/component-library';
import UiMenuItem from '@infermedica/component-library/src/components/organisms/UiMenu/_internal/UiMenuItem.vue';
import {
  scrollTabindex as vScrollTabindex,
  keyboardFocus as vKeyboardFocus,
} from '@infermedica/component-library/src/utilities/directives';
import Footer from '@/components/Footer/Footer.vue';

type SidePanelPropsType = {
  isSidePanelOpen: boolean;
}

defineProps<SidePanelPropsType>();

const emit = defineEmits(['toogleSidePanel']);

const navigation = [
  {
    text: 'Infermedica',
    href: 'https://infermedica.com/',
    target: '_blank',
  },
  {
    text: 'Component Library',
    href: 'https://component.infermedica.com/',
    target: '_blank',
  },

  {
    text: 'API',
    href: 'https://developer.infermedica.com/',
    target: '_blank',
  },
];

const toggleSidePanel = () => {
  emit('toogleSidePanel');
};
const handleClick = (href: string) => {
  window.open(href);
};
</script>

<style lang="scss">
.side-panel {

  &__content {
    --side-panel-content-padding-block-end: 0;
    --side-panel-content-padding-inline: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__footer {
    justify-content: flex-start;
  }
}
</style>
