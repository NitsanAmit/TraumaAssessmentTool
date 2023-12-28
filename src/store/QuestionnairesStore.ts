import { action, computed, makeAutoObservable } from 'mobx';
import questions from '../data/questions.json';

export class QuestionnairesStore {

  questionnaireIndex: number = 0;
  questionnaireScores = {};

  constructor() {
    makeAutoObservable(this);
  }

 @computed
  get currentQuestion() {
    return questions[this.questionnaireIndex];
  }

 @computed
  get nextEnabled() {
    return questions[this.questionnaireIndex];
  }

  @action
  nextQuestion(didPassScoreBar: boolean, score: number) {
    this.questionnaireScores[this.questionnaireIndex] = { score, didPassScoreBar };
    this.questionnaireIndex++;
  }

}
