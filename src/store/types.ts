
export type QuestionnairesSummary = ({
  questionnaireName: string;
  questionnaireType: string;
  score: number;
} & QuestionnaireRange)[];

export type QuestionnaireRange = {
  maxScore: number;
  minScore: number;
  threshold: number;
}

export const SECOND_STAGE_RESULT_CATEGORY = {
  NEGATIVE: 'NEGATIVE',
  POSITIVE: 'POSITIVE',
  SLIGHTLY_POSITIVE: 'SLIGHTLY_POSITIVE',
}

export type SecondStageResultCategory = typeof SECOND_STAGE_RESULT_CATEGORY[keyof typeof SECOND_STAGE_RESULT_CATEGORY];
