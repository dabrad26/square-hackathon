import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import FloatingButton from '../../components/FloatingButton';
import dataService from '../../services/DataService';
import type PhotoItem from '../../interfaces/Photo';
import PhotoWallArea from '../../components/PhotoWallArea';

class PhotoWall extends React.Component<RouteComponentProps> {
  state = {
    filterFood: undefined as string | undefined,
  };

  private submitOwn = (): void => {
    const { history } = this.props;

    history.push('/submit');
  };

  private openItem = (image: PhotoItem): void => {
    const { history } = this.props;

    history.push(`/review/${image.review_id || ''}`);
  };

  private clearFilter = (): void => {
    this.setState({ filterFood: undefined });
  };

  private setFilter = (newFilter: string): void => {
    const { filterFood } = this.state;

    this.setState({ filterFood: filterFood === newFilter ? undefined : newFilter });
  };

  render (): React.ReactNode {
    const { filterFood } = this.state;

    return (
      <div className="photo-wall has-floating-button standard-top-padding">
        <h1>Photo wall</h1>
        <div className="filter">
          <div className="filter--label">
            <div className="filter--label--heading">
              Filter by popular dishes:
            </div>
            {!!filterFood && <button onClick={this.clearFilter} type="button" className="filter--label--clear">
              Clear
            </button>}
          </div>
          <div className="filter--tags">
            {dataService.menuItems.map((item, index) => {
              return <div key={index} onClick={() => { this.setFilter(item.name); }} className={`tag-item ${(item.name === filterFood) ? 'selected' : ''}`}>
                {item.name}
              </div>;
            })}
          </div>
        </div>
        <PhotoWallArea className="picture-area-wrapper" openItem={this.openItem} pictures={dataService.getPhotos(filterFood)} />
        <FloatingButton text="Submit your own" kind="secondary" onClick={this.submitOwn} />
      </div>
    );
  }
}

export default withRouter(PhotoWall);
