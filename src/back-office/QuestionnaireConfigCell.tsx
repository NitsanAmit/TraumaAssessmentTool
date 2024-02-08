import { observer } from 'mobx-react-lite';
import { QuestionBase } from '../components/questionnaires/base/types';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  TableCell,
  TableRow,
} from '@fluentui/react-components';
import styled from 'styled-components';

export const QuestionnaireConfigCell: React.FC<{ question: ConfigCellQuestion }> = observer(({ question }) => {

  return (
    <TableRow>
      <NameCell>{question.questionnaire}</NameCell>
      <TableCell>{question.questionnaireType}</TableCell>
      <TableCell>{question.threshold ?? ''}</TableCell>
      {
        question.questionTitle &&
        <TableCell className="rtl">{question.questionTitle}</TableCell>
      }
      {
        question.questions &&
        <TableCell>
          <Accordion collapsible className="full-width">
            <AccordionItem value="1">
              <AccordionHeader expandIconPosition="end">Questions:</AccordionHeader>
              <AccordionPanel dir="rtl">
                <StyledUl>
                  {
                    question.questions.map((question) => {
                      const questionText = typeof question === 'string' ? question : question.text;
                      return <li key={questionText}>{questionText}</li>;
                    })
                  }
                </StyledUl>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </TableCell>
      }
    </TableRow>
  );
});

type ConfigCellQuestion = QuestionBase & {
  threshold?: number;
  questionTitle?: string;
  questions?: Array<string | { text: string }>;
};


const NameCell = styled(TableCell)`
  font-weight: 700;
`, StyledUl = styled.ul`
  direction: rtl;
  text-align: right;
  padding-inline: 0;
  margin-block: 0;
  font-size: 12px;
  li {
    list-style-position: inside;
    margin-bottom: 4px;
  }
`;
