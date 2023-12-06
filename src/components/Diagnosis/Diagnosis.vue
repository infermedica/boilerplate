<template>
  <section class="diagnosis">
    <aside class="diagnosis__aside">
      <PatientDetails />
    </aside>
    <template v-if="currentQuestion">
      <UiQuestion
        :title="currentQuestion.text"
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
            @click="handleGetQuestion(patientData)"
          >
            Next
          </UiButton>
        </template>
      </UiQuestion>
    </template>
  </section>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import {
  UiButton,
  UiQuestion,
} from '@infermedica/component-library';
import QuestionGroupSingle from '@/components/QuestionGroupSingle/QuestionGroupSingle.vue';
import QuestionMultiple from '@/components/QuestionMultiple/QuestionMultiple.vue';
import QuestionSingle from '@/components/QuestionSingle/QuestionSingle.vue';
import PatientDetails from '@/components/PatientDetails/PatientDetails.vue';
import {
  getDiagnosis,
  type ChoiceIdType,
  type QuestionType,
} from '@/services';
import { type PatientData } from '@/types';

type QuestionProps = {
  patientData: PatientData;
}

const props = defineProps<QuestionProps>();
const emit = defineEmits(['updateEvidences', 'updateSurveyShouldStop']);

const currentQuestion = ref<QuestionType>();
const questionGroupSingleUserAnswer = ref({});
const questionGroupMultipleUserAnswer = ref<Record<string, unknown>[]>([]);
const questionSingleUserAnswer = ref<ChoiceIdType | undefined>(undefined);

const templateQuestions = computed(() => [
  {
    name: 'group_single',
    component: QuestionGroupSingle,
    props: {
      userAnswer: questionGroupSingleUserAnswer.value,
      answers: currentQuestion.value && currentQuestion.value.items,
      handlePatientEvidences: (evidences: Record<string, unknown>) => {
        questionGroupSingleUserAnswer.value = evidences;
        emit('updateEvidences', [{ id: evidences.id, choiceId: 'present' }]);
      },
    },
  },
  {
    name: 'group_multiple',
    component: QuestionMultiple,
    props: {
      answers: currentQuestion.value && currentQuestion.value.items,
      userAnswers: questionGroupMultipleUserAnswer.value,
      handlePatientEvidences: (evidences: Record<string, unknown>[]) => {
        questionGroupMultipleUserAnswer.value = [...evidences];

        const answer = evidences.map((choice, index) => ({
          id: currentQuestion.value && currentQuestion.value.items && currentQuestion.value.items[index].id,
          choiceId: choice,
        }));

        emit('updateEvidences', answer);
      },
    },
  },
  {
    name: 'single',
    component: QuestionSingle,
    props: {
      answers: currentQuestion.value && currentQuestion.value.items,
      userAnswer: questionSingleUserAnswer.value,
      handlePatientEvidences: (evidence: ChoiceIdType) => {
        const answer = {
          id: currentQuestion.value?.items[0].id as string,
          choiceId: evidence,
        };
        emit('updateEvidences', [answer]);
      },
    },
  },
]);

const handleGetQuestion = async (patient: PatientData) => {
  const {
    sex,
    age: { value },
    evidences,
  } = patient;

  const {
    question,
    shouldStop,
  } = await getDiagnosis({
    sex,
    age: {
      value,
    },
    evidence: [
      ...evidences,
    ],
  });

  currentQuestion.value = question;

  questionGroupSingleUserAnswer.value = {};
  questionGroupMultipleUserAnswer.value = [];
  questionSingleUserAnswer.value = undefined;

  if (shouldStop) {
    emit('updateSurveyShouldStop');
  }

  return question;
};

onMounted(async () => {
  currentQuestion.value = await handleGetQuestion(props.patientData);
});

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
