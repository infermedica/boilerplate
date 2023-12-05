<template>
  <section class="patient-details">
    <UiHeading level="4" class="patient-details__heading">
      Patient details and symptoms
    </UiHeading>

    <UiBulletPoints>
      <UiBulletPointsItem
        icon="checkmark"
      >
        {{ capitalizeFirstLetter(sex) }}, {{ age }} year old
      </UiBulletPointsItem>
      <UiBulletPointsItem
        v-for="(item, index) in symptomsNames"
        :key="index"
        icon="checkmark"
      >
        {{ item }}
      </UiBulletPointsItem>
    </UiBulletPoints>
  </section>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  ref,
} from 'vue';
import {
  UiBulletPoints,
  UiHeading,
} from '@infermedica/component-library';
import UiBulletPointsItem from '@infermedica/component-library/src/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import { capitalizeFirstLetter } from '@/helpers';
import {
  getSymptomsById,
  type EvidenceType,
} from '@/services';
import { type PatientData } from '@/App.vue';

const patientDetails = inject('patientData') as PatientData;
const initialEvidences = inject('initialEvidence') as EvidenceType[];
const sex = computed(() => patientDetails.sex);
const age = computed(() => patientDetails.age.value);
const evidences = computed(() => initialEvidences);
const symptomsNames = ref<unknown[]>([]);

onMounted(async () => {
  symptomsNames.value = await Promise.all(evidences.value.map(async (evidence) => {
    const { name } = await getSymptomsById({
      symptomId: evidence.id,
      age: {
        value: age.value,
      },
    });
    return name;
  }));
});

</script>

<style lang="scss">
.patient-details {
  --bullet-points-item-marker-color: var(--color-icon-primary);
  --heading-margin-block-end: var(--space-8);
}
</style>
