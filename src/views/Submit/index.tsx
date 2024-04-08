import React, { type ChangeEvent } from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import dataService from '../../services/DataService';
import FloatingButton from '../../components/FloatingButton';

class Submit extends React.Component<RouteComponentProps> {
  state = {
    view: 'pick' as 'pick' | 'review' | 'share',
    reviewText: '',
  };

  private images: string[] = [];

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
    this.images = images;
    this.setState({ view: 'review' });
  };

  private cancel = (): void => {
    this.setState({ view: 'pick', reviewText: '' });
  };

  private postReview = (): void => {
    // TODO: Save data
    this.setState({ view: 'share' });
  };

  private get mainView(): React.ReactNode {
    const { view, reviewText } = this.state;

    switch (view) {
      case 'review':
        return (
          <>
            <div className="review-picture-wrapper">
              {this.images.map((item, index) => {
                return <div key={index} className="picture-item" style={{ backgroundImage: `url(${item})` }} />;
              })}
            </div>
            <textarea value={reviewText} onChange={event => { this.setState({ reviewText: event.target.value }); }} placeholder="What did you like about your dish?" />
            <FloatingButton text="Post it" kind="primary" onClick={this.postReview} closeAction={this.cancel} />
          </>
        );
      case 'share':
        return (
          <>
            <h1>TODO: shared component for viewing reviews</h1>
            <FloatingButton text="Share" kind="primary" onClick={this.share} />
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

  render (): React.ReactNode {
    const { view } = this.state;

    return (
      <div className={`submit ${view !== 'pick' ? 'has-floating-button' : ''}`}>
        {this.mainView}
      </div>
    );
  }
}

export default withRouter(Submit);
