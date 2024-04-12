import React from 'react';
import './styles.scss';
import logo from './logo.jpg';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import IconMenu from '../../icons/Menu';
import IconCart from '../../icons/Cart';
import { darkColor } from '../../styles/colors';
import dataService from '../../services/DataService';
import IconLeftCaret from '../../icons/LeftCaret';

class Header extends React.Component<RouteComponentProps> {
  private clickedMenu = (): void => {
    alert('Photo Wall for Square Hackathon\n\n Submitted by:\n- Cynthia Yue\n- David Bradshaw\n- Ricky Lau\n\nhttps://devpost.com/software/633959');
  };

  private clickedCart = (): void => {
    const { history } = this.props;

    history.push('/cart');
  };

  private clickedHome = (): void => {
    const { history } = this.props;

    history.push('/');
  };

  private goToMenu = (): void => {
    const { history } = this.props;

    history.push('/menu');
  };

  render (): React.ReactNode {
    const { location } = this.props;
    const cartView = location.pathname.includes('/cart');

    return (
      <div className="header">
        {cartView
          ? <button type="button" onClick={this.goToMenu}>
          <IconLeftCaret color={darkColor} />
        </button>
          : <button type="button" onClick={this.clickedMenu}>
          <IconMenu color={darkColor} />
        </button>}
        <button type="button" onClick={this.clickedHome}>
          <img src={logo as string} alt={dataService.businessInfo.name} />
        </button>
        {cartView
          ? <div className="spacer" />
          : <button type="button" className="cart-wrapper" onClick={this.clickedCart}>
          <IconCart color={darkColor} />
          {!!dataService.cartTotalItems && <div className="cart-count">{dataService.cartTotalItems}</div>}
        </button>}
      </div>
    );
  }
}

export default withRouter(Header);
