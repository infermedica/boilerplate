<template>
  <section class="results">
    <UiCard
      :title="title"
      :description="description"
      :type="triageType"
      class="ui-card--modern"
    >
      <template #details>
        <section v-if="triageType === ('consultation' || 'consultation_24')" class="results__explanation">
          <div>
            <UiHeading
              level="4"
            >
              Recommended doctor
            </UiHeading>
            <UiText>{{ recommendedSpecialistName }}</UiText>
          </div>
          <div>
            <UiHeading
              level="4"
            >
              Recommended appointment type
            </UiHeading>
            <UiText>{{ recommendedSpecialistChannel }}</UiText>
          </div>
        </section>
        <section v-if="triageType === ('emergency' || 'emergency_ambulance')" class="results__explanation">
          <UiHeading level="4">
            Be sure to report:
          </UiHeading>
          <UiBulletPoints>
            <UiBulletPointsItem
              v-for="(item, index) in seriousEvidences"
              :key="index"
            >
              {{ item }}
            </UiBulletPointsItem>
          </UiBulletPoints>
        </section>
      </template>
    </UiCard>
  </section>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
} from 'vue';
import {
  UiCard,
  UiHeading,
  UiText,
  UiBulletPoints,
} from '@infermedica/component-library';
import UiBulletPointsItem from '@infermedica/component-library/src/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import {
  getTriage,
  getRecommendSpecialist,
  type RecommendSpecialistType,
  type TriageLevelType,
} from '@/services';
import { type PatientData } from '@/templates/Default.vue';

type ResultsProps = {
  patientData: PatientData;
};

const props = defineProps<ResultsProps>();

const sex = computed(() => props.patientData.sex);
const age = computed(() => props.patientData.age.value);
const evidences = computed(() => props.patientData.evidences);

const title = ref('');
const description = ref('');
const triageType = ref<TriageLevelType | undefined>(undefined);

const cardData = {
  self_care: {
    title: 'Self-care may be enough',
    description: 'The symptoms you have reported may not require medical evaluation and they usually resolve on their own. Sometimes they can be eased with self-care methods. If the symptoms get worse or new symptoms appear, consult a doctor.',
  },
  consultation: {
    title: 'Consult a doctor',
    description: 'Your symptoms may require medical evaluation. Schedule an appointment with your doctor. If your symptoms get worse, see a doctor immediately.',
  },
  consultation_24: {
    title: 'Consult a doctor within 24 hours',
    description: 'Your symptoms may require prompt medical evaluation. If your symptoms suddenly get worse, go to the nearest emergency department.',
  },
  emergency: {
    title: 'Go to the nearest emergency department',
    description: 'Your symptoms are worrisome and you may require urgent care. If you can\'t get to an emergency department, please call an ambulance.',
  },
  emergency_ambulance: {
    title: 'Call an ambulance',
    description: 'Your symptoms are very serious, and you may require emergency care. Do not delay. Call an ambulance right now.',
  },
};

const seriousEvidences = ref<string[] | undefined>([]);
const recommendedSpecialistChannel = ref('');
const recommendedSpecialistName = ref<RecommendSpecialistType | undefined>(undefined);

onMounted(async () => {
  const {
    triageLevel,
    serious,
  } = await getTriage({
    sex: sex.value,
    age: {
      value: age.value,
    },
    evidence: evidences.value,
  });
  seriousEvidences.value = serious?.map((symptom) => symptom.name);

  if (triageLevel) {
    triageType.value = triageLevel;
    title.value = cardData[triageLevel].title;
    description.value = cardData[triageLevel].description;
  }

  const {
    recommendedChannel,
    recommendedSpecialist,
  } = await getRecommendSpecialist({
    sex: sex.value,
    age: {
      value: age.value,
    },
    evidence: evidences.value,
  });

  if (recommendedChannel) recommendedSpecialistChannel.value = recommendedChannel;
  if (recommendedSpecialist) recommendedSpecialistName.value = recommendedSpecialist;
});

</script>

<style lang="scss">
.results {
  @media (min-width: 768px) {
    margin-top: var(--space-40);
  }

  &__explanation {
    margin-top: var(--space-12);
  }
}
</style>
