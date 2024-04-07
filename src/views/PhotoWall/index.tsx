import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';

class PhotoWall extends React.Component<RouteComponentProps> {
  render (): React.ReactNode {
    return (
      <div className="photo-wall">
        Photo Wall View
      </div>
    );
  }
}

export default withRouter(PhotoWall);
