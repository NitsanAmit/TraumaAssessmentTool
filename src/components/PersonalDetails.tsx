import { PersonalDetailsStore } from '../store/PersonalDetailsStore';
import { TextField, Dropdown, Button } from 'monday-ui-react-core';
import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { DropdownOption } from './types';


export const PersonalDetails: React.FC<PersonalDetailsProps> = observer(({ personalDetailsStore, onNextClicked }) => {

  const onFirstNameChanged = useCallback(value => personalDetailsStore.firstName = value, [personalDetailsStore]);
  const onLastNameChanged = useCallback(value => personalDetailsStore.lastName = value, [personalDetailsStore]);
  const onGenderChanged = useCallback((value: DropdownOption) => personalDetailsStore.gender = value, [personalDetailsStore]);
  const onAgeChanged = useCallback(value => personalDetailsStore.age = value, [personalDetailsStore]);
  const onFamilyStatusChanged = useCallback((value: DropdownOption) => personalDetailsStore.familyStatus = value, [personalDetailsStore]);
  const onchildnumberChanged = useCallback(value => personalDetailsStore.childNumber = value, [personalDetailsStore]);
  const onGeneralHealthStatusChanged = useCallback(value => personalDetailsStore.generalHealthStatus = value, [personalDetailsStore]);
  const onGeneralStateChanged = useCallback(value => personalDetailsStore.generalState = value, [personalDetailsStore]);
  const onGeneralMentalHealthStateChanged = useCallback(value => personalDetailsStore.generalMentalHealthState = value, [personalDetailsStore]);
  const onGrugsUsageChanged = useCallback(value => personalDetailsStore.drugsUsage = value, [personalDetailsStore]);

  return (
    <PersonalDetailsScreenContainer>
      <Header>שאלון היכרות</Header>
      <MediumTextField placeholder="שם פרטי" value={personalDetailsStore.firstName} onChange={onFirstNameChanged}/>
      <MediumTextField placeholder="שם משפחה" value={personalDetailsStore.lastName} onChange={onLastNameChanged}/>
      <StyledDropdown placeholder="מגדר" options={[
        {
          label: 'זכר',
          value: 1
        },
        {
          label: 'נקבה',
          value: 2
        },
        {
          label: 'מעדיפ/ה לא לציין',
          value: 3
        }
      ]}
        value={personalDetailsStore.gender} onOptionSelect={onGenderChanged} rtl/>
      <MediumTextField placeholder="גיל" value={personalDetailsStore.age} onChange={onAgeChanged}/>
      <StyledDropdown placeholder="מצב משפחתי" options={[
        {
          label: 'רווק/ה',
          value: 1
        },
        {
          label: 'נשוי / נשואה',
          value: 2
        },
        {
          label: 'גרוש/ה',
          value: 3
        },
        {
          label: 'אלמנ/ה',
          value: 4
        },
        {
          label: 'מעדיפ/ה לא לציין',
          value: 5
        },
        {
          label: 'אחר',
          value: 6
        }
      ]}
       value={personalDetailsStore.familyStatus} onOptionSelect={onFamilyStatusChanged} rtl/>
      <MediumTextField placeholder="מספר ילדים" value={personalDetailsStore.childNumber} onChange={onchildnumberChanged}/>
      <ParagraphTextField title="בריאות כללית נוכחית" placeholder={generalHealthStatusExplainStr} value={personalDetailsStore.generalHealthStatus} onChange={onGeneralHealthStatusChanged}/>
      <ParagraphTextField title="מצב כללי" placeholder={generalStateExplainStr} value={personalDetailsStore.generalState} onChange={onGeneralStateChanged}/>
      <ParagraphTextField title="בריאות נפשית" placeholder={generalMentalHealthStateExplainStr} value={personalDetailsStore.generalMentalHealthState} onChange={onGeneralMentalHealthStateChanged}/>
      <ParagraphTextField title="שימוש בתרופות" placeholder={drugsUsageExplainStr} value={personalDetailsStore.drugsUsage} onChange={onGrugsUsageChanged}/>
      <Button onClick={onNextClicked}>הבא</Button>
    </PersonalDetailsScreenContainer>
  );
});

const MediumTextField = ({ placeholder, value, onChange}) => {
  return <StyledTextField placeholder={placeholder} value={value} onChange={onChange} size={TextField.sizes.MEDIUM} />;
}

const ParagraphTextField = ({ title, placeholder, value, onChange}) => {
  return <StyledTextField title={title} placeholder={placeholder} value={value} onChange={onChange} size={TextField.sizes.MEDIUM} />;
}

export type PersonalDetailsProps = {
  personalDetailsStore: PersonalDetailsStore;
  onNextClicked: () => void;
}

const PersonalDetailsScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`,
StyledDropdown = styled(Dropdown)`
  width: 100%;
`,
StyledTextField = styled(TextField)`
  width: 100%;
`,
Header = styled.h1`
  color: green;
`;

const generalHealthStatusExplainStr = "אנא פרט/י על מצבך הבריאותי. האם קיימת מחלה הדורשת טיפול תרופתי או התערבות רפואית אחרת ועוד";
const generalStateExplainStr = "אנא פרט/י לפי הנושאים הבאים: לחצים נוכחיים (מעבר דירה, אבטלה, קרובי משפחה חטופים), האם קיימת תמיכה חברתית / בדידות?";
const generalMentalHealthStateExplainStr = "אנא פרט/י על בעיות בריאות נפש קודמות שהצדיקו התערבות (תרופתית, טיפול פסיכולוגי ועוד)"
const drugsUsageExplainStr = "אנא פרט/י האם את/ה משתמש/ת בתרופות לחרדה, מצב רוח, שינה ועוד";
