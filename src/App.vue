<template>
  <div class="app__wrapper">
    <Header />
    <main class="app__container">
      <WekcomeScreen />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import WekcomeScreen from '@/components/views/WelcomeScreen.vue';

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
