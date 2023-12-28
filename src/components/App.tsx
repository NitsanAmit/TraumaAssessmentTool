import questions from  '../data/questions.json';
import { MinMaxScale } from './questionnaires/base/MinMaxScale';

export const App: React.FC = () => {

  return (
    <div className="App">
      <h1>hello</h1>
      {
        questions.map((question: Question, index) => {
          const QuestionComponent = questionTypeToComponentMap[question.questionnaireType];
          if (!QuestionComponent) {
            return null;
          }
          return <QuestionComponent key={index} {...question} />
        })
      }
    </div>
  );
}

export type Question = {
  questionnaire: string;
  questionnaireType: string;
}

const questionTypeToComponentMap: Record<string, React.FC<any>> = {
  'min-max-scale': MinMaxScale,
};
