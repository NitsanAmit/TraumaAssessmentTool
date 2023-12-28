import { useState } from 'react';
import { PersonalDetailsStore } from '../store/PersonalDetailsStore';

export const PersonalDetails: React.FC = () => {

  const [personalDetailsStore, setPersonalDetailsStore] = useState<PersonalDetailsStore>(new PersonalDetailsStore());

  return null;
}
