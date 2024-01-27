import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useDebugMode = () => {

  const [searchParams] = useSearchParams();
  return useMemo(() => searchParams.get('mode') === 'debug', [searchParams]);

};
