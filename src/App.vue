<template>
  <Default>
    <template #main>
      <Main :patient-data="patientData" />
    </template>
  </Default>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Default from '@/templates/Default.vue';
import Main from '@/templates/Main/Main.vue';
import {
  type AgeRequestType,
  type SexType,
  type EvidenceType,
} from '@/services';

export type PatientData = {
  sex: SexType;
  age: AgeRequestType;
  evidences: EvidenceType[];
}

const patientData = reactive<PatientData>({
  sex: 'female',
  age: {
    value: 30,
  },
  evidences: [
    {
      id: 's_1193',
      choiceId: 'present',
      source: 'initial',
    },
    {
      id: 's_488',
      choiceId: 'present',
    },
    {
      id: 's_418',
      choiceId: 'present',
    },
  ],
});
</script>

<style scope lang="scss">
@import '~@infermedica/component-library/src/styles/styles.scss';
@import '@/styles/style.scss';

</style>
