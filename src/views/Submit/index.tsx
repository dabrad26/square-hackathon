import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';

class Submit extends React.Component<RouteComponentProps> {
  render (): React.ReactNode {
    return (
      <div className="submit">
        Submit View
      </div>
    );
  }
}

export default withRouter(Submit);
