<template>
  <section class="patient-details">
    <UiHeading level="4" class="patient-details__heading">
      Patient details and symptoms
    </UiHeading>

    <UiBulletPoints>
      <UiBulletPointsItem
        icon="checkmark"
      >
        {{ capitalizeFirstLetter(sex) }}, {{ value }} year old
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
  ref,
  onMounted,
} from 'vue';
import {
  UiBulletPoints,
  UiHeading,
} from '@infermedica/component-library';
import UiBulletPointsItem from '@infermedica/component-library/src/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import { patientData } from '../../patientData';
import { capitalizeFirstLetter } from '../../helpers';
import { useSymptomsById } from '../../services';

const {
  sex,
  age: { value },
  evidences,
} = patientData;
const symptomsNames = ref<unknown[]>([]);

onMounted(async () => {
  symptomsNames.value = await Promise.all(evidences.map(async (evidence) => {
    const { name } = await useSymptomsById({
      symptomId: evidence.id,
      age: {
        value,
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
