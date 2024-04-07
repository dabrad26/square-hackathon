import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';

class PhotoDetails extends React.Component<RouteComponentProps> {
  render (): React.ReactNode {
    return (
      <div className="photo-details">
        Photo Details View
      </div>
    );
  }
}

export default withRouter(PhotoDetails);
