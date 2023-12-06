<template>
  <footer class="footer">
    <UiText class="ui-text--body-2-comfortable">
      &copy;{{ year }} Infermedica
    </UiText>
  </footer>
</template>

<script setup lang="ts">
import { UiText } from '@infermedica/component-library';

const year = new Date().getFullYear();
</script>

<style lang="scss">
.footer {
  --text-color: var(--color-text-action-secondary, #5773A1);

  margin-top: auto;
  padding: var(--space-24);
  border-top: 1px solid var(--color-border-divider, #E6EAF0);
  display: flex;
  justify-content: center;
}
</style>
