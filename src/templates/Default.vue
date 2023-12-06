<template>
  <div class="default__wrapper">
    <Header
      @toogle-side-panel="toogleSidePanel"
    />
    <slot name="main" />
    <Footer />
    <SidePanel
      :is-side-panel-open="isSidePanelOpen"
      @toogle-side-panel="toogleSidePanel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidePanel from '@/components/SidePanel/SidePanel.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';

const isSidePanelOpen = ref(false);

const toogleSidePanel = () => { isSidePanelOpen.value = !isSidePanelOpen.value; };

</script>

<style lang="scss">
.default {
  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }
}
</style>
