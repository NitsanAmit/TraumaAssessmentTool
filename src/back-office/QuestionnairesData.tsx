import { useFirebase } from '../components/hooks/useFirebase';
import styled from 'styled-components';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, Card, Text } from '@fluentui/react-components';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ResultsHistogram } from './ResultsHistogram';

export type Entry = { created: Timestamp; results: any[] };
export const QuestionnairesData = () => {

  const { firestore } = useFirebase();
  const [data, setData] = useState<Entry[]>();

  useEffect(() => {
    if (firestore && !data) {
      const docs: Entry[] = [];
      getDocs(collection(firestore, 'anonymousResults')).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push(doc.data() as Entry);
        });
        setData(docs);
      });
    }
  }, [data, firestore]);

  return (
    <StyledCard size="large">
      {
        data &&
        <ResultsHistogram data={data} />
      }
      <Accordion className="full-width flex-1" collapsible>
        {
          data?.map((entry) => {
            return (
              <AccordionItem className="margin-bottom-sm" value={entry.created.toDate().toISOString()}>
                <AccordionHeader>{entry.created.toDate().toISOString()}</AccordionHeader>
                <AccordionPanel>

                  {
                    entry.results.map((result) => {
                      return <div className="flex-column">
                        <div><Text weight="bold">{result.questionnaireName}: </Text>{result.score}{result.didPassThreshold ? ' (Passed threshold)' : ''}</div>
                      </div>;
                    })
                  }
                </AccordionPanel>
              </AccordionItem>
            );
          })
        }
      </Accordion>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  @media (max-width: 390px) {
    border-radius: 0;
    padding: 16px;
  }
  direction: ltr;
  text-align: left;
`;
