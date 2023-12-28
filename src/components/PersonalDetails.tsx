import { PersonalDetailsStore } from '../store/PersonalDetailsStore';
import { EditableText } from 'monday-ui-react-core';
import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

export const PersonalDetails: React.FC<PersonalDetailsProps> = observer(({ personalDetailsStore }) => {

  const onNameChanged = useCallback(value => personalDetailsStore.firstName = value, [personalDetailsStore]);

  return (
    <>
    <EditableText value={personalDetailsStore.firstName} onChange={onNameChanged}/>
    </>
  );
});

export type PersonalDetailsProps = {
  personalDetailsStore: PersonalDetailsStore;
}
