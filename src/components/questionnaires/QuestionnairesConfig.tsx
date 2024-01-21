import { observer } from 'mobx-react-lite';
import { useQuestions } from '../hooks/useQuestions';
import { QuestionnaireTypes } from './base/types';
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '@fluentui/react-components';
import styled from 'styled-components';

export const QuestionnairesConfig: React.FC = observer(() => {

  const questions = useQuestions();

  return (
    <StyledTable>
      <TableHeader>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Type</TableHeaderCell>
        <TableHeaderCell>Threshold (including)</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {
          questions?.map((question) => {
            return (
              <TableRow>
                {
                  question.questionnaireType === QuestionnaireTypes.CUT_OFF &&
                  <TableCell><Divider/></TableCell>
                }
                {
                  question.questionnaireType !== QuestionnaireTypes.CUT_OFF &&
                  <>
                    <TableCell>{question.questionnaire}</TableCell>
                    <TableCell>{question.questionnaireType}</TableCell>
                    {
                      // @ts-ignore
                    question.threshold &&
                      // @ts-ignore
                      <TableCell>{question.threshold}</TableCell>
                    }
                    {
                      question.questionnaireType === QuestionnaireTypes.CONDITION_QUESTIONNAIRE &&
                      <TableCell>{question['conditionResult']}</TableCell>
                    }
                  </>
                }
              </TableRow>
            )
          })
        }
      </TableBody>
    </StyledTable>
  )
});

const StyledTable = styled(Table)`
  width: 100%;
  margin-top: 16px;
  direction: ltr;
  text-align: left;
`;
