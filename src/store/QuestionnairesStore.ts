import { action, computed, makeAutoObservable } from 'mobx';
import _ from 'lodash';
import questions from '../data/questions.json';
import { QuestionBase } from '../components/questionnaires/base/types';

const CUT_OFF_STEP = 'cut-off';

export class QuestionnairesStore {

  questionnaireIndex: number = 3;
  questionnaireScores = {};
  questionnairesStates = Array<unknown>(questions.length);

  constructor(private proceedToSummary: () => void) {
    makeAutoObservable(this);
  }

  @computed
  get currentQuestion(): QuestionBase {
    return questions[this.questionnaireIndex];
  }

  @computed
  get currentQuestionState(): unknown {
    return this.questionnairesStates[this.questionnaireIndex];
  }

  @computed
  get summary(): { questionnaireName: string; questionnaireType:string; score: number; }[] {
    return _.chain(questions)
      .map((question, index) => ({
        questionnaireName: questions[index].questionnaire,
        questionnaireType: questions[index].questionnaireType,
        score: this.questionnaireScores[index]?.score,
      }))
      .filter(({ questionnaireType, score }) => questionnaireType !== CUT_OFF_STEP && score !== undefined)
      .value();
  }

  @action
  previousQuestion() {
    this.questionnaireIndex--;
  }

  @action
  nextQuestion(currentState: unknown, didPassScoreBar: boolean, score: number | string) {
    this.questionnairesStates[this.questionnaireIndex] = currentState;
    this.questionnaireScores[this.questionnaireIndex] = { score, didPassScoreBar };
    const finishedAllQuestionnaires = this.questionnaireIndex === questions.length - 1;
    const didntPassScoreBar = this.currentQuestion.questionnaireType === CUT_OFF_STEP && !didPassScoreBar;
    if (didntPassScoreBar || finishedAllQuestionnaires) {
      this.proceedToSummary();
      return;
    }
    this.questionnaireIndex++;
    if (this.currentQuestion?.questionnaireType === CUT_OFF_STEP) {
      this.questionnairesStates[this.questionnaireIndex] = _.some(this.questionnaireScores, ({ didPassScoreBar }) => didPassScoreBar);
    }
  }

  @computed
  get stepDisplayName() {
    if (this.currentQuestion.questionnaireType === 'cut-off') {
      return 'סוף שאלון א';
    }
    return this.currentQuestion?.questionnaire;
  }
}
