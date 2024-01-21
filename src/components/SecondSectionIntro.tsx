import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button } from '@fluentui/react-components';
import { ChevronLeft16Regular } from '@fluentui/react-icons/lib/fonts';
import { QuestionnaireBase } from './questionnaires/base/QuestionnaireBase';
import { QuestionnairesStore } from '../store/QuestionnairesStore';

export const SecondSectionIntro: React.FC<SecondSectionIntroProps> = observer(({ questionnairesStore }) => {

  return (
    <QuestionnaireBase questionTitle="סיימת את שלב א' של האבחון">
      <div className="flex-column full-width align-center">
        {
          questionnairesStore.requiresSecondSection
            ? 'הציון שלך מצביע על סיכוי להפרעות טראומה, ולכן יש להמשיך לחלק ב'
            : 'הציון שלך מצביע על סיכוי נמוך להפרעות טראומה, ולכן ניתן להפסיק את האבחון. אם בכל זאת רוצים, עדיין אפשר להמשיך ולסיים את שלב ב במידה ומרגישים צורך.'
        }
        <StyledButtonsContainer>
          <Button
            size="large"
            appearance="primary"
            className="flex-1 margin-ml"
            icon={<ChevronLeft16Regular/>}
            iconPosition="after"
            onClick={() => questionnairesStore.nextQuestion(true, false, 0)}>
            התחלת שלב ב'
          </Button>
          {
            !questionnairesStore.requiresSecondSection &&
            <Button
              appearance="secondary"
              className="flex-1 margin-ml"
              onClick={() => questionnairesStore.proceedToSummary()}>
              סיום האבחון
            </Button>
          }
        </StyledButtonsContainer>
      </div>
    </QuestionnaireBase>
  );
});

export type SecondSectionIntroProps = {
  questionnairesStore: QuestionnairesStore;
}

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 16px;
  margin-top: 32px;
`;
