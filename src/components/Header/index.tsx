import React from 'react';
import './styles.scss';
import logo from './logo.jpg';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import IconMenu from '../../icons/Menu';
import IconCart from '../../icons/Cart';
import { darkColor } from '../../styles/colors';
import dataService from '../../services/DataService';

class Header extends React.Component<RouteComponentProps> {
  private clickedMenu = (): void => {
    alert('Clicked Menu');
  };

  private clickedCart = (): void => {
    const { history } = this.props;

    history.push('/cart');
  };

  private clickedHome = (): void => {
    const { history } = this.props;

    history.push('/');
  };

  render (): React.ReactNode {
    return (
      <div className="header">
        <button type="button" onClick={this.clickedMenu}>
          <IconMenu color={darkColor} />
        </button>
        <button type="button" onClick={this.clickedHome}>
          <img src={logo as string} alt={dataService.businessInfo.name} />
        </button>
        <button type="button" onClick={this.clickedCart}>
          <IconCart color={darkColor} />
        </button>
      </div>
    );
  }
}

export default withRouter(Header);
