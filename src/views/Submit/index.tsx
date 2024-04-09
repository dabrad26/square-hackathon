import React, { type ChangeEvent } from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import dataService from '../../services/DataService';
import FloatingButton from '../../components/FloatingButton';
import type PhotoItem from '../../interfaces/Photo';
import { type MenuItem } from '../../interfaces/SquareData';
import Loading from '../../components/Loading';

class Submit extends React.Component<RouteComponentProps<{ id?: string }>> {
  state = {
    view: 'pick' as 'pick' | 'review',
    reviewText: '',
    currentPhoto: 0,
    loading: true,
  };

  private images: PhotoItem[] = [];
  private receiptItems: MenuItem[] = [];

  private seeAllPhotos = (): void => {
    const { history } = this.props;

    history.push('/photos');
  };

  private choosePictures = (): void => {
    const foundElement = document.querySelector('#file-picker') as HTMLInputElement;

    if (foundElement && typeof foundElement.click === 'function') {
      foundElement.click();
    } else {
      console.error('Submit: unable to find file picker');
    }
  };

  private getBase64FromImage = async (file: File): Promise<string> => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => { resolve(reader.result as string); };
      reader.onerror = error => { reject(error); };
    });
  };

  private imagePicked = (event: ChangeEvent<HTMLInputElement>): void => {
    const promises: Array<Promise<string>> = [];
    let index = 0;

    if (event.target.files) {
      while (index < (event.target.files?.length || 0)) {
        promises.push(this.getBase64FromImage(event.target.files[index]));
        index++;
      }
    }

    if (promises.length) {
      Promise.all(promises).then(data => {
        this.nextStep(data);
      }).catch(error => {
        console.error('Submit: unable to get images', error);
      });
    }
  };

  private share = (): void => {
    alert('TODO: Share');
  };

  private nextStep = (images: string[]): void => {
    this.images = images.map(item => {
      return {
        foods: [],
        url: item,
      };
    });

    this.setState({ view: 'review' });
  };

  private cancel = (): void => {
    this.images = [];
    this.setState({ view: 'pick', reviewText: '' });
  };

  private postReview = (): void => {
    const { history } = this.props;
    const { reviewText } = this.state;

    this.setState({ loading: true });
    dataService.saveReview({ text: reviewText, photos: this.images }).then(response => {
      this.setState({ loading: false });
      history.push(`/review/${response.id || ''}?share_mode=true`);
    }).catch(error => {
      this.setState({ loading: false });
      console.error('Unable to submit review', error);
    });
  };

  private get mainView(): React.ReactNode {
    const { view, reviewText, currentPhoto } = this.state;

    switch (view) {
      case 'review':
        return (
          <>
            <div className="review-picture-wrapper">
              {this.images.map((item, index) => {
                return <div key={index} className={`picture-item ${currentPhoto === index ? 'selected-item' : ''}`} onClick={() => { this.setState({ currentPhoto: index }); }} style={{ backgroundImage: `url(${item.url})` }} />;
              })}
            </div>
            <div className="review-tag-items">
              <div className="small-tight-regular-font">What&apos;s in this photo?</div>
              <div className="tags-wrapper">
                {(this.receiptItems.length ? this.receiptItems : dataService.menuItems).map((item, index) => {
                  const currentFood = this.images[currentPhoto];
                  const currentTags = currentFood?.foods || [];
                  const isActive = currentTags.includes(item.name);

                  return <div
                    key={index}
                    onClick={() => {
                      if (isActive) {
                        const foundIndex = currentFood.foods.indexOf(item.name);

                        if (foundIndex !== -1) {
                          currentFood.foods.splice(foundIndex, 1);
                        }
                      } else {
                        currentFood.foods?.push(item.name);
                      }

                      this.setState({});
                    }}
                    className={`tag-item ${isActive ? 'selected' : ''}`}
                  >
                    {item.name}
                  </div>;
                })}
              </div>
            </div>
            <textarea value={reviewText} onChange={event => { this.setState({ reviewText: event.target.value }); }} placeholder="What did you like about your dish?" />
            <FloatingButton text="Post it" kind="primary" onClick={this.postReview} closeAction={this.cancel} />
          </>
        );
      case 'pick':
      default:
        return (
          <>
            <div className="banner" />
            <div className="submit-info">
              <h2>Create a referral post</h2>
              <p className="info-text">Share pictures of your food to earn points (that can be redeemed for food) for every purchase made through your referral.</p>
              <input multiple={true} accept="image/*" type="file" id="file-picker" style={{ display: 'none' }} onChange={this.imagePicked} />
              <button onClick={this.choosePictures}>Add file</button>
            </div>
            <div className="photo-from-customers">
              <p className="heading-text">From customers</p>
              <div className="picture-wrapper">
                {dataService.photos.map((item, index) => {
                  return <div key={index} className="picture-item" style={{ backgroundImage: `url(${item.url})` }} />;
                })}
              </div>
              <button onClick={this.seeAllPhotos}>See the photo wall</button>
            </div>
          </>
        );
    }
  }

  componentDidMount(): void {
    const { match } = this.props;

    if (match.params.id) {
      dataService.getReceiptMenuItems(match.params.id).then(data => {
        this.receiptItems = data;
        this.setState({ loading: false });
      }).catch(error => {
        console.error('Submit: unable to get receipt data', error);
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  }

  render (): React.ReactNode {
    const { view, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className={`submit ${view !== 'pick' ? 'has-floating-button' : ''}`}>
        {this.mainView}
      </div>
    );
  }
}

export default withRouter(Submit);
