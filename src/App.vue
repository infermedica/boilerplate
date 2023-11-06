<template>
  <div class="app">
    <Header />
    <div class="app__container">
      <WekcomeScreen />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import WekcomeScreen from '@/components/views/WelcomeScreen.vue';

</script>

<style lang="scss">
@import '~@infermedica/component-library/src/styles/styles.scss';
@import '@/styles/style.scss';

</style>
