import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';

class ReviewDetails extends React.Component<RouteComponentProps> {
  render (): React.ReactNode {
    return (
      <div className="review-details">
        Review View
      </div>
    );
  }
}

export default withRouter(ReviewDetails);
