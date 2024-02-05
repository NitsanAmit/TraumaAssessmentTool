import { useFirebase } from '../components/hooks/useFirebase';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Spinner } from '@fluentui/react-components';

export const ProtectedRoute: React.FC<PropsWithChildren<{}>> = observer(({ children }) => {
  const { auth } = useFirebase();
  const [user, setUser] = useState(auth?.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      return onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
    }
  }, [auth]);

  if (loading) {
    return <Spinner/>;
  }
  if (!user) {
    return <Navigate to="/" replace/>;
  }
  return <>{children}</>;
});
