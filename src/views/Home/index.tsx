/* eslint-disable spellcheck/spell-checker */
import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import dataService from '../../services/DataService';
import { bannerImage } from '../../styles/images';
import PhotoWallArea from '../../components/PhotoWallArea';
import type PhotoItem from '../../interfaces/Photo';
import GoogleMapReact from 'google-map-react';
import { primaryBrand } from '../../styles/colors';
import IconMarker from '../../icons/Marker';

class Home extends React.Component<RouteComponentProps> {
  private openMenu = (): void => {
    const { history } = this.props;

    history.push('/menu');
  };

  private openPhotos = (): void => {
    const { history } = this.props;

    history.push('/photos');
  };

  private openReview = (image: PhotoItem): void => {
    const { history } = this.props;

    history.push(`/review/${image.review_id || ''}`);
  };

  render (): React.ReactNode {
    const location = {
      lat: 37.775214439436525,
      lng: -122.4175984644198,
    };

    return (
      <div className="home">
        <div className="banner" style={{ backgroundImage: `url('${bannerImage}')` }}>
          <button onClick={this.openMenu} className="primary-action">Order now</button>
        </div>
        <div className="photo-from-customers">
          <p className="heading-text">Customer favorites</p>
          <PhotoWallArea className="picture-wrapper" openItem={this.openReview} pictures={dataService.getPhotos()} />
          <button className="open-all" type="button" onClick={this.openPhotos}>See the photo wall</button>
        </div>
        <div className="location">
          <p className="heading-text">Location</p>
          <p className="normal-text">{dataService.businessInfo.address}</p>
          <p className="normal-text">{dataService.businessInfo.city}, {dataService.businessInfo.state} {dataService.businessInfo.zipCode}</p>
          <p className="normal-text">{dataService.businessInfo.phone}</p>
          <div className="map-area">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAWh8L5cXch42xLnQ5iZD9iFmLjAEzBRzM' }}
              center={location}
              zoom={15}
              draggable={false}
              options={{ disableDefaultUI: true }}
            >
                <IconMarker color={primaryBrand} size={64} />
            </GoogleMapReact>
          </div>
        </div>
        <div className="location">
          <p className="heading-text">Hours</p>
          <p className="normal-text">MON - SUN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 7:00 am - 11:00 pm</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
