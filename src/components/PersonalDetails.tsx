import { PersonalDetailsStore } from '../store/PersonalDetailsStore';
import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Dropdown, Field, Input, Option, Radio, RadioGroup, Text } from '@fluentui/react-components';
import { useFirebase } from './hooks/useFirebase';
import { StickyBottomButtonPage } from './StickyButtonPage';

export const PersonalDetails: React.FC<PersonalDetailsProps> = observer(({ personalDetailsStore, onNextClicked }) => {

  const setProperty = useCallback((property: string, option = false) => (_, data) => {
    const value = option ? data.optionValue : data.value;
    if (value.length > 500 || value < 0) {
      return;
    }
    personalDetailsStore.setProperty(property, option ? data.optionValue : data.value);
  }, [personalDetailsStore]);

  const { logEvent } = useFirebase();
  useEffect(() => {
    logEvent('personal_details_visited');
  }, [logEvent]);

  return (
    <StickyBottomButtonPage buttonText={'המשך'} onButtonClick={onNextClicked}>
      <h1 className="full-width align-text-right">שאלות אישיות (רשות)</h1>
      <Text wrap weight="semibold" className="full-width">
        * אף נתון מדף זה לא נשמר או נאסף, גם לא לצרכי מחקר.
      </Text>
      <Text wrap className="full-width margin-bottom-ml">
        מילוי הפרטים הוא רק עבורך, אם תרצה/י שיופיעו לצד תוצאות השאלונים בסיכום שתקבל/י, עבור התייעצות חיצונית.
      </Text>
      <PersonalDetailsScreenContainer>
        <PersonalDetailsDropdown placeholder="מגדר" value={personalDetailsStore.gender}
                                 onOptionSelect={setProperty('gender', true)}
                                 options={['זכר', 'נקבה', 'מעדיפ/ה לא לציין']}/>
        <LargeTextField type="number" placeholder="גיל" value={personalDetailsStore.age} onChange={setProperty('age')}/>
        <PersonalDetailsDropdown placeholder="מצב משפחתי" value={personalDetailsStore.familyStatus}
                                 onOptionSelect={setProperty('familyStatus', true)}
                                 options={['רווק/ה', 'נשוי / נשואה', 'גרוש/ה', 'אלמנ/ה', 'מעדיפ/ה לא לציין', 'אחר']}/>
        <LargeTextField type="number" placeholder="מספר ילדים" value={personalDetailsStore.childNumber}
                        onChange={setProperty('childNumber')}/>
        <PersonalDetailsDropdown placeholder="מה מצבך בריאותך הגופנית היום?"
                                 value={personalDetailsStore.generalHealthStatus}
                                 onOptionSelect={setProperty('generalHealthStatus', true)}
                                 options={['לגמרי תקין', 'בסך הכל בסדר', 'יש בעיות קלות', 'יש בעיות קשות']}/>
        <PersonalDetailsDropdown placeholder="האם יש עליך לחצים היום (כמו מעבר דירה, אבטלה, קרובי משפחה חטופים)?"
                                 value={personalDetailsStore.generalState}
                                 onOptionSelect={setProperty('generalState', true)}
                                 options={['אין בכלל', 'מעט לחץ', 'הרבה לחץ', 'לחצים בלתי נסבלים']}/>
        <PersonalDetailsDropdown placeholder="האם אנשים אחרים (חברים, מכרים, קרובי משפחה) תומכים בך היום?"
                                 value={personalDetailsStore.supportCircle}
                                 onOptionSelect={setProperty('supportCircle', true)}
                                 options={['תמיכה מלאה', 'קצת תומכים', 'תמיכה בסדר', 'לא תומכים מספיק']}/>
        <Field label="האם קיבלת בעבר טיפול נפשי?" className="full-width">
          <RadioGroup onChange={setProperty('mentalTreatmentPast')} value={personalDetailsStore.mentalTreatmentPast} name="mental-treatment-past">
            <Radio value="כן" label="כן"/>
            <Radio value="לא" label="לא"/>
          </RadioGroup>
        </Field>
        <Field label="האם את/ה עכשיו בטיפול נפשי?" className="full-width">
          <RadioGroup onChange={setProperty('mentalTreatmentNow')} value={personalDetailsStore.mentalTreatmentNow} name="mental-treatment-now">
            <Radio value="כן" label="כן"/>
            <Radio value="לא" label="לא"/>
          </RadioGroup>
        </Field>
        <Field label="האם את/ה משתמש/ת היום בתרופות לחרדה, שינה או מצב רוח?" className="full-width">
          <RadioGroup onChange={setProperty('drugsUsage')} value={personalDetailsStore.drugsUsage} name="drugs-usage">
            <Radio value="כן" label="כן"/>
            <Radio value="לא" label="לא"/>
          </RadioGroup>
        </Field>
        <StyledImage src="/personal-details.png"/>
      </PersonalDetailsScreenContainer>
    </StickyBottomButtonPage>
  );
});

const LargeTextField = ({ placeholder, value, onChange, type }) => {
  return <StyledTextField placeholder={placeholder} value={value} onChange={onChange} type={type} size="large"/>;
}
const LargeDropdown = ({ placeholder, value, onOptionSelect, children }) => {
  return <StyledDropdown placeholder={placeholder} value={value} onOptionSelect={onOptionSelect}
                         size="large">{children}</StyledDropdown>;
}
const PersonalDetailsDropdown = ({ placeholder, value, onOptionSelect, options }) =>
  <LargeDropdown
    placeholder={placeholder} value={value} onOptionSelect={onOptionSelect}>
    {
      options.map(option => <Option key={option}>{option}</Option>)
    }
  </LargeDropdown>;

export type PersonalDetailsProps = {
  personalDetailsStore: PersonalDetailsStore;
  onNextClicked: () => void;
}

const PersonalDetailsScreenContainer = styled.div`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          row-gap: 24px;
  `,
  StyledDropdown = styled(Dropdown)`
    width: 100%;
  `,
  StyledTextField = styled(Input)`
    width: 100%;
  `,
  StyledImage = styled.img`
    width: 70%;
    max-width: 300px;
    margin-bottom: 8px;
  `;
