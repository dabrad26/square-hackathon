import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';

class MenuDetails extends React.Component<RouteComponentProps> {
  render (): React.ReactNode {
    return (
      <div className="menu-details">
        TODO: Menu Details View
      </div>
    );
  }
}

export default withRouter(MenuDetails);
