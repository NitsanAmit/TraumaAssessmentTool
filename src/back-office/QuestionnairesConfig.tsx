import { observer } from 'mobx-react-lite';
import { useQuestions } from '../components/hooks/useQuestions';
import { QuestionnaireTypes } from '../data/data.consts';
import {
  Button,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '@fluentui/react-components';
import { tableRowClassName } from '@fluentui/react-table';
import styled from 'styled-components';
import { QuestionnaireConfigCell } from './QuestionnaireConfigCell';
import { useFirebase } from '../components/hooks/useFirebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const QuestionnairesConfig: React.FC = observer(() => {

  const questions = useQuestions();
  const { auth } = useFirebase();
  const navigate = useNavigate();

  const onSignOut = () => {
    auth && signOut(auth).finally(() => {
      navigate('/');
    });
  }

  return (
    <StyledCard>
      <div className="flex-row flex-1 full-width space-between">
        <div/>
        <Button onClick={onSignOut} appearance="subtle">התנתק/י</Button>
      </div>
      <StyledTable size="small">
        <TableHeader>
          <TableRow>
            <StyledTableHeaderCell weight={4}>Name</StyledTableHeaderCell>
            <StyledTableHeaderCell weight={4}>Type</StyledTableHeaderCell>
            <StyledTableHeaderCell weight={4}>Threshold</StyledTableHeaderCell>
            <StyledTableHeaderCell weight={2}>Question Title</StyledTableHeaderCell>
            <StyledTableHeaderCell weight={1}>Sub questions</StyledTableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            questions?.map((question) => {
              if (question.questionnaireType === QuestionnaireTypes.CUT_OFF) {
                return <TableRow><TableCell><Divider>סוף שלב א</Divider></TableCell></TableRow>;
              }
              if (question.questionnaireType === QuestionnaireTypes.CONDITION_QUESTIONNAIRE) {
                // @ts-ignore
                return <QuestionnaireConfigCell question={question.conditionQuestionnaire}/>
              }
              if (question.questionnaireType === QuestionnaireTypes.MULTI_DISCRETE_SCALE) {
                // @ts-ignore
                return question.questionnaires.map((questionnaire) => <QuestionnaireConfigCell
                  question={{ ...questionnaire, questionnaireType: QuestionnaireTypes.DISCRETE_SCALE }}/>);
              }
              return <QuestionnaireConfigCell question={question}/>;
            })
          }
        </TableBody>
      </StyledTable>
    </StyledCard>
  )
});

const StyledCard = styled(Card)`
          overflow-y: auto;
          background: white;
  `,
  StyledTable = styled(Table)`
    width: 100%;
    margin-top: 16px;
    direction: ltr;
    text-align: left;
    table-layout: fixed;
    .${tableRowClassName} {
      background: white;
    }
    @media (max-width: 480px) {
      font-size: 12px;
    }
  `,
  StyledTableHeaderCell = styled(TableHeaderCell)<{ weight: number }>`
    font-weight: 700;
    font-size: 16px;
    width: ${props => (100 / props.weight)}%;
  `;
