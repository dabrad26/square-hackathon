import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import FloatingButton from '../../components/FloatingButton';
import dataService from '../../services/DataService';
import type PhotoItem from '../../interfaces/Photo';

class PhotoWall extends React.Component<RouteComponentProps> {
  private submitOwn = (): void => {
    const { history } = this.props;

    history.push('/submit');
  };

  private openItem = (image: PhotoItem): void => {
    const { history } = this.props;

    history.push(`/review/${image.review_id || ''}`);
  };

  render (): React.ReactNode {
    return (
      <div className="photo-wall has-floating-button">
        <h1>Photo wall</h1>
        <div className="picture-area">
          {dataService.photos.map((item, index) => {
            return <button key={index} onClick={() => { this.openItem(item); }} className="picture-item" style={{ backgroundImage: `url(${item.url})` }} />;
          })}
        </div>
        <FloatingButton text="Submit your own" kind="secondary" onClick={this.submitOwn} />
      </div>
    );
  }
}

export default withRouter(PhotoWall);
