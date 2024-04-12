import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import FloatingButton from '../../components/FloatingButton';
import dataService from '../../services/DataService';
import type PhotoItem from '../../interfaces/Photo';
import ErrorView from '../../components/ErrorView';

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

    const pictures = dataService.getPhotos(filterFood);

    return (
      <div className="photo-wall has-floating-button">
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
        <div className="picture-area">
          {pictures.length
            ? pictures.map((item, index) => {
              return <button key={index} onClick={() => { this.openItem(item); }} className="picture-item" style={{ backgroundImage: `url(${item.url})` }} />;
            })
            : <ErrorView text="No pictures found" />}
        </div>
        <FloatingButton text="Submit your own" kind="secondary" onClick={this.submitOwn} />
      </div>
    );
  }
}

export default withRouter(PhotoWall);
