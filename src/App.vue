<template>
  <Default>
    <template #main>
      <Main />
    </template>
  </Default>
</template>

<script setup lang="ts">
import {
  provide,
  reactive,
} from 'vue';
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

const initialEvidence = reactive<EvidenceType[]>([
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
]);

const patientData = reactive<PatientData>({
  sex: 'female',
  age: {
    value: 30,
  },
  evidences: [...initialEvidence],
});

provide('patientData', patientData);
provide('initialEvidence', initialEvidence);

</script>

<style scope lang="scss">
@import '~@infermedica/component-library/src/styles/styles.scss';
@import '@/styles/style.scss';

</style>
