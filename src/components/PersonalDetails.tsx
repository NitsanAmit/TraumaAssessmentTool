import { PersonalDetailsStore } from '../store/PersonalDetailsStore';
import { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button, Dropdown, Field, Input, Option, Textarea } from '@fluentui/react-components';

export const PersonalDetails: React.FC<PersonalDetailsProps> = observer(({ personalDetailsStore, onNextClicked }) => {

  const setProperty = useCallback((property: string, option = false) => {
    return ((_, data) => personalDetailsStore.setProperty(property, option ? data.optionValue : data.value));
  }, [personalDetailsStore]);
  return (
    <>
      <h1>שאלון היכרות</h1>
      <PersonalDetailsScreenContainer>
        <LargeTextField type="text" placeholder="שם פרטי" value={personalDetailsStore.firstName}
                        onChange={setProperty('firstName')}/>
        <LargeTextField type="text" placeholder="שם משפחה" value={personalDetailsStore.lastName}
                        onChange={setProperty('lastName')}/>
        <LargeDropdown placeholder="מגדר" value={personalDetailsStore.gender}
                       onOptionSelect={setProperty('gender', true)}>
          <Option key="זכר">זכר</Option>
          <Option key="נקבה">נקבה</Option>
          <Option key="מעדיפ/ה לא לציין">מעדיפ/ה לא לציין</Option>
        </LargeDropdown>
        <LargeTextField type="number" placeholder="גיל" value={personalDetailsStore.age} onChange={setProperty('age')}/>
        <LargeDropdown placeholder="מצב משפחתי" value={personalDetailsStore.familyStatus} onOptionSelect={setProperty('familyStatus', true)}>
          <Option key="רווק/ה">רווק/ה</Option>
          <Option key="נשוי / נשואה">נשוי / נשואה</Option>
          <Option key="גרוש/ה">גרוש/ה</Option>
          <Option key="אלמנ/ה">אלמנ/ה</Option>
          <Option key="מעדיפ/ה לא לציין">מעדיפ/ה לא לציין</Option>
          <Option key="אחר">אחר</Option>
        </LargeDropdown>
        <LargeTextField type="number" placeholder="מספר ילדים" value={personalDetailsStore.childNumber}
                        onChange={setProperty('childNumber')}/>
        <Max500TextArea title="בריאות כללית נוכחית" placeholder={generalHealthStatusExplainStr}
                        value={personalDetailsStore.generalHealthStatus}
                        onChange={setProperty('generalHealthStatus')}/>
        <Max500TextArea title="מצב כללי" placeholder={generalStateExplainStr}
                        value={personalDetailsStore.generalState}
                        onChange={setProperty('generalState')}/>
        <Max500TextArea title="בריאות נפשית" placeholder={generalMentalHealthStateExplainStr}
                        value={personalDetailsStore.generalMentalHealthState}
                        onChange={setProperty('generalMentalHealthState')}/>
        <Max500TextArea title="שימוש בתרופות" placeholder={drugsUsageExplainStr}
                        value={personalDetailsStore.drugsUsage}
                        onChange={setProperty('drugsUsage')}/>
        <Button onClick={onNextClicked} appearance="primary" size="large" className="full-width">הבא</Button>
      </PersonalDetailsScreenContainer>
    </>
  );
});

const LargeTextField = ({ placeholder, value, onChange, type }) => {
  return <StyledTextField placeholder={placeholder} value={value} onChange={onChange} type={type} size="large"/>;
}
const LargeDropdown = ({ placeholder, value, onOptionSelect, children }) => {
  return <StyledDropdown placeholder={placeholder} value={value} onOptionSelect={onOptionSelect}
                         size="large">{children}</StyledDropdown>;
}

const Max500TextArea = ({ placeholder, value, onChange, title }) => {
  return <StyledField label={title} hint="עד 500 תווים">
    <StyledTextArea placeholder={placeholder} value={value} onChange={onChange} resize="none" size="large"/>
  </StyledField>;
}

export type PersonalDetailsProps = {
  personalDetailsStore: PersonalDetailsStore;
  onNextClicked: () => void;
}

const PersonalDetailsScreenContainer = styled.div`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          row-gap: 16px;
  `,
  StyledDropdown = styled(Dropdown)`
    width: 100%;
  `,
  StyledTextField = styled(Input)`
    width: 100%;
  `,
  StyledField = styled(Field)`
    width: 100%;
  `,
  StyledTextArea = styled(Textarea)`
    width: 100%;
    height: 100px;
  `;

const generalHealthStatusExplainStr = 'אנא פרט/י על מצבך הבריאותי. האם קיימת מחלה הדורשת טיפול תרופתי או התערבות רפואית אחרת ועוד';
const generalStateExplainStr = 'אנא פרט/י לפי הנושאים הבאים: לחצים נוכחיים (מעבר דירה, אבטלה, קרובי משפחה חטופים), האם קיימת תמיכה חברתית / בדידות?';
const generalMentalHealthStateExplainStr = 'אנא פרט/י על בעיות בריאות נפש קודמות שהצדיקו התערבות (תרופתית, טיפול פסיכולוגי ועוד)'
const drugsUsageExplainStr = 'אנא פרט/י האם את/ה משתמש/ת בתרופות לחרדה, מצב רוח, שינה ועוד';
