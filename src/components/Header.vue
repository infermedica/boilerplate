<template>
  <UiHeader
    :title="title"
    :logo="logo"
    :navigation="navigation"
    :button-brand-attrs="buttonBrandAttrs"
    :button-hamburger-attrs="buttonHamburgerAttrs"
    :icon-hamburger-attrs="iconHamburgerAttrs"
    :icon-logo-attrs="iconLogoAttrs"
    class="header"
    @hamburger:close="onHamburgerClose"
    @hamburger:open="onHamburgerOpen"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { UiHeader } from '@infermedica/component-library';

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
  // onClick: events.onClickBrandButton,
  onClick: () => console.log('brand button'),
};
const buttonHamburgerAttrs = { id: 'hamburger-button' };
const iconHamburgerAttrs = { 'data-testid': 'hamburger-icon' };
const iconLogoAttrs = {
  'data-testid': 'logo-icon',
  style: '--icon-color: var(--color-icon-on-brand)',
};
const isMenuOpen = ref(false);

function onHamburgerClose() {
  isMenuOpen.value = !isMenuOpen.value;
}

function onHamburgerOpen() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style lang="scss">
.header {
  --header-max-width: 20rem;

  @media (min-width: 768px) {
    --header-max-width: 42.5rem;
  }
}
</style>
