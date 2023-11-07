<template>
  <UiHeader
    :title="title"
    :logo="logo"
    :navigation="navigation"
    :button-brand-attrs="buttonBrandAttrs"
    :button-hamburger-attrs="buttonHamburgerAttrs"
    :icon-logo-attrs="iconLogoAttrs"
    class="header"
    @hamburger:close="handleToggleSidePanel"
    @hamburger:open="handleToggleSidePanel"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { UiHeader } from '@infermedica/component-library';

const emit = defineEmits(['toogleSidePanel']);
const title = 'Infermedica';
const logo = defineAsyncComponent(() => import('@/assets/logo.svg')) as SVGAElement;
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
const buttonBrandAttrs = {
  id: 'brand-button',
  onClick: () => window.open('https://infermedica.com/', '_blank'),
};
const buttonHamburgerAttrs = { id: 'hamburger-button' };
const iconLogoAttrs = {
  style: '--icon-color: var(--color-icon-on-brand)',
};

function handleToggleSidePanel() {
  emit('toogleSidePanel');
}

</script>

<style lang="scss">
.header {
  .ui-header__container {
    width: unset;
  }

  @media (min-width: 768px) {
    --header-max-width: 42.5rem;
  }
}
</style>
