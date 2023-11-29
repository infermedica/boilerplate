<template>
  <section class="diagnosis">
    <aside class="diagnosis__aside">
      <PatientDetails />
    </aside>
    <UiQuestion
      :title="title"
      class="diagnosis__question"
    >
      <template
        v-for="question in templateQuestions"
        :key="question.name"
      >
        <component
          :is="question.component"
          v-if="question.name === currentQuestion.type"
          v-bind="question.props"
        />
      </template>
      <template #actions-bottom>
        <UiButton
          class="diagnosis__action-button"
          @click="handleGoNext"
        >
          Next
        </UiButton>
      </template>
    </UiQuestion>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  UiButton,
  UiQuestion,
} from '@infermedica/component-library';
import QuestionGroupSingle from '@/components/QuestionGroupSingle/QuestionGroupSingle.vue';
import QuestionMultiple from '@/components/QuestionMultiple/QuestionMultiple.vue';
import QuestionSingle from '@/components/QuestionSingle/QuestionSingle.vue';
import PatientDetails from '@/components/PatientDetails/PatientDetails.vue';
import {
  type ChoiceIdType,
  type EvidenceType,
  type QuestionType,
} from '@/services';
import { type PatientData } from '@/types';

type QuestionProps = {
  currentQuestion: QuestionType;
  patientData: PatientData;
}

const props = defineProps<QuestionProps>();
const emit = defineEmits(['getNextQuestion', 'updateEvidences']);

const title = computed(() => props.currentQuestion.text);

const templateQuestions = computed(() => [
  {
    name: 'group_single',
    component: QuestionGroupSingle,
    props: {
      answers: props.currentQuestion.items,
      handlePatientEvidences: (evidences: ChoiceIdType[]) => {
        const answers = evidences.map<EvidenceType>((evidence, index) => ({
          id: props.currentQuestion.items[index].id as string,
          choiceId: evidence,
        }));

        emit('updateEvidences', answers);
      },
    },
  },
  {
    name: 'group_multiple',
    component: QuestionMultiple,
    props: {
      answers: props.currentQuestion.items,
      handlePatientEvidences: (evidences: EvidenceType[]) => emit('updateEvidences', evidences),
    },
  },
  {
    name: 'single',
    component: QuestionSingle,
    props: {
      answers: props.currentQuestion.items,
      handlePatientEvidences: (evidence: ChoiceIdType) => {
        const answer = {
          id: props.currentQuestion.items[0].id as string,
          choiceId: evidence,
        };
        emit('updateEvidences', [answer]);
      },
    },
  },
]);

const handleGoNext = () => {
  emit('getNextQuestion', props.patientData);
};
</script>

<style lang="scss">
.diagnosis {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: var(--space-32) var(--space-20);
  gap: var(--space-32);

  @media (min-width: 768px) {
    max-width: var(--app-container-width);
    flex-direction: row;
    align-items: flex-start;
    margin: var(--space-32) var(--space-20);
    margin-inline: auto;
    gap: var(--space-40);
  }

  &__aside {
    @media (min-width: 768px) {
      max-width: 12.5rem;
      margin-top: var(--space-12);
    }
  }

  &__question {
    width: var(--app-container-width);

    @media (min-width: 768px) {
      margin-top: var(--space-12);
    }
  }

  &__action-button {
    margin-top: var(--space-32)
  }
}

</style>
