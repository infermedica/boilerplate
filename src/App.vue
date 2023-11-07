<template>
  <div class="app__wrapper">
    <Header
      @toogle-side-panel="handleToggleSidePanel"
    />
    <main class="app__container">
      <WekcomeScreen />
    </main>
    <Footer />
    <SidePanel
      :is-side-panel-open="isSidePanelOpen"
      @toogle-side-panel="handleToggleSidePanel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidePanel from './components/SidePanel.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import WekcomeScreen from '@/components/views/WelcomeScreen.vue';

const isSidePanelOpen = ref(false);

const handleToggleSidePanel = () => {
  isSidePanelOpen.value = !isSidePanelOpen.value;
};
</script>

<style lang="scss">
@import '~@infermedica/component-library/src/styles/styles.scss';
@import '@/styles/style.scss';

.app {
  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    position: relative;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }
}
</style>
