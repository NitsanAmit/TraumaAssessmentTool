import { observer } from 'mobx-react-lite';
import { QuestionnaireBaseProps } from './types';
import { QuestionnaireBase } from './QuestionnaireBase';

export type CutoffProps = QuestionnaireBaseProps & {
  initialState: boolean;
};

export const Cutoff: React.FC<CutoffProps> = observer(({ onNextClicked, initialState }) => {

  return <QuestionnaireBase questionTitle="סיימת את חלק א' של האבחון"
                            nextEnabled={true}
                            onNextClicked={() => onNextClicked(initialState, initialState, 0)}
                            nextButtonText={initialState ? 'המשך לחלק ב' : 'סיים אבחון'}>
    {
      initialState ? 'הציון שלך מצביע על סיכוי להפרעות טראומה, ולכן יש להמשיך לחלק ב'
        : 'הציון שלך מצביע על סיכוי נמוך להפרעות טראומה, ולכן ניתן להפסיק את האבחון'
    }
  </QuestionnaireBase>;
});
