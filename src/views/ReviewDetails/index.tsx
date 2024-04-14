import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import FloatingButton from '../../components/FloatingButton';
import IconLeftCaret from '../../icons/LeftCaret';
import { primaryBrand } from '../../styles/colors';
import dataService from '../../services/DataService';
import ErrorView from '../../components/ErrorView';
import Loading from '../../components/Loading';
import type ReviewItem from '../../interfaces/Review';
import IconShare from '../../icons/Share';

class ReviewDetails extends React.Component<RouteComponentProps<{ id: string }>> {
  state = {
    shareMode: false,
    loading: true,
    error: false,
  };

  private review: ReviewItem = { text: '', photos: [] };

  private goToPhotoWall = (): void => {
    const { history } = this.props;

    history.push('/photos');
  };

  private goToMenu = (): void => {
    const { history } = this.props;

    history.push('/menu');
  };

  private goToMenuItem = (id: string): void => {
    const { history } = this.props;

    history.push(`/menu/${id}`);
  };

  private share = (): void => {
    const url = window.location.href.replace('?share_mode=true', '');

    if (navigator.share) {
      navigator.share({
        title: 'Share your review',
        url: window.location.href.replace('?share_mode=true', ''),
      })
        .catch(error => {
          console.error('Unable to share', error);
        });
    } else {
      alert(`URL to share:\n\n ${url}`);
    }
  };

  componentDidMount(): void {
    const { match, location } = this.props;

    const foundReview = dataService.getReviewById(match.params.id);

    if (foundReview) {
      this.review = foundReview;
      this.setState({ loading: false, shareMode: location.search?.includes('share_mode=true') });
    } else {
      this.setState({ loading: false, error: true });
    }
  }

  render (): React.ReactNode {
    const { shareMode, loading, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorView text="Review not found" />;
    }

    return (
      <div className="review-details has-floating-button standard-top-padding">
        <button type="button" onClick={this.goToPhotoWall} className="breadcrumb">
          <IconLeftCaret color={primaryBrand} />
          <span>Photo wall</span>
        </button>
        <div className="picture-wrapper">
          {this.review.photos.map((item, index) => {
            return (
              <div key={index} className="picture-item-wrapper">
                <div className="picture-item" style={{ backgroundImage: `url(${item.url})` }} />
                <div className="tag-wrapper">
                  {item.foods?.map((food, foodKey) => {
                    const linkedFood = dataService.findMatchingMenuItem(food);

                    return (
                      <div key={foodKey} className={`food-tag ${linkedFood ? 'clickable' : ''}`} onClick={linkedFood ? () => { this.goToMenuItem(linkedFood.id); } : undefined} >
                        <span className="food-tag--primary">{food}</span>
                        {!!(linkedFood?.variations[0] && linkedFood?.variations[0].price) && <span className="food-tag--secondary">${linkedFood?.variations[0].price}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="review-text">
          {this.review.text}
        </div>
        {shareMode ? <FloatingButton text="Share" kind="primary" onClick={this.share} icon={<IconShare color={'#ffffff'} />} /> : <FloatingButton text="See full menu" kind="secondary" onClick={this.goToMenu} />}
      </div>
    );
  }
}

export default withRouter(ReviewDetails);
