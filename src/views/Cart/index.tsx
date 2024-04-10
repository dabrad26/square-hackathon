import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';

class Cart extends React.Component<RouteComponentProps> {
  render (): React.ReactNode {
    return (
      <div className="cart">
        TODO: Cart View
      </div>
    );
  }
}

export default withRouter(Cart);
