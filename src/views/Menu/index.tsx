import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';

class Menu extends React.Component<RouteComponentProps> {
  render (): React.ReactNode {
    return (
      <div className="menu">
        TODO: Menu View
      </div>
    );
  }
}

export default withRouter(Menu);
