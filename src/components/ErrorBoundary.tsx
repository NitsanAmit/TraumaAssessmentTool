import React from 'react';
import { Button } from '@fluentui/react-components';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getApps } from 'firebase/app';

export class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    const app = getApps()?.[0];
    app && logEvent(getAnalytics(app), 'error_boundary_caught_error', { error });
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="full-height flex-column align-center justify-center">
          <h1>אופס!</h1>
          <div className="margin-bottom-xl" >קרתה תקלה לא צפויה, ודיווחנו על זה למי שצריכים לדעת. בינתיים אפשר לנסות להתחיל מחדש.</div>
          <Button appearance="primary" size="large" onClick={() => window.location.reload()} shape="circular">
            להתחיל מחדש
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
