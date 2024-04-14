import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import dataService from '../../services/DataService';
import { backupImage } from '../../styles/images';
import FloatingButton from '../../components/FloatingButton';
import { type CartItem } from '../../interfaces/CartItem';
import IconMinus from '../../icons/Minus';
import IconPlus from '../../icons/Plus';
import { primaryBrand, textSecondary } from '../../styles/colors';
import IconTrash from '../../icons/Trash';
import IconNav from '../../icons/Nav';
import IconTime from '../../icons/Time';

class Cart extends React.Component<RouteComponentProps> {
  state = {
    tipPercent: 15,
    promoCode: '',
  };

  private get cartHasContent(): boolean {
    return !!dataService.cartItems.length;
  }

  private checkOut = (): void => {
    alert('This is the end of this app. Next step would be to process payment and submit order via Square.');
  };

  private signInPoints = (): void => {
    alert('This app does not support points. Next step would be to sign in to Square and retrieve points and apply.');
  };

  private goToMenu = (): void => {
    const { history } = this.props;

    history.push('/menu');
  };

  private get baseTotal(): number {
    let totalPrice = 0;

    dataService.cartItems.forEach(item => {
      totalPrice += item.quantity * item.item.basePrice;
    });

    return totalPrice;
  }

  private removeItem = (item: CartItem): void => {
    dataService.removeCartItem(item);
    this.setState({});
  };

  private decreaseQuantity = (item: CartItem): void => {
    if (item.quantity === 1) {
      return;
    }

    item.quantity = item.quantity - 1;
    dataService.updateCartItem(item);
    this.setState({});
  };

  private increaseQuantity = (item: CartItem): void => {
    item.quantity = item.quantity + 1;
    dataService.updateCartItem(item);
    this.setState({});
  };

  private get cartView(): React.ReactNode {
    const { tipPercent, promoCode } = this.state;
    const pickup = new Date();
    pickup.setMinutes(pickup.getMinutes() + 25);

    const tipOptions = [0, 15, 18, 20];
    const tax = this.baseTotal * 0.07;
    const currentTip = this.baseTotal * (tipPercent * 0.01);

    return (
      <div className="cart-view">
        <div className="cart-pickup">
          <div className="cart-pickup--item">
            <IconNav color={textSecondary} size={16} />
            {dataService.businessInfo.address}, {dataService.businessInfo.city}
          </div>
          <div className="cart-pickup--item">
            <IconTime color={textSecondary} size={16} />
            {pickup.toLocaleDateString(undefined, { minute: '2-digit', hour: 'numeric', month: 'long', year: 'numeric', day: 'numeric' })}
          </div>
        </div>
        <div className="cart-items">
          {dataService.cartItems.map((cartItem, index) => {
            return (
              <div key={index} className="cart-item">
                <div className="cart-item--image" title={cartItem.item.name} style={{ backgroundImage: `url(${cartItem.item.image ? cartItem.item.image : backupImage})` }} />
                <div className="cart-item--info">
                  <div className="cart-item--info--left">
                    <div className="cart-item--info-name">{cartItem.item.name}</div>
                    <div>
                      <div className="quantity-change">
                        <button type="button" onClick={() => { this.decreaseQuantity(cartItem); }} className="quantity-change--action"><IconMinus size={16} color={primaryBrand} /></button>
                        <span className="quantity-change--count">{cartItem.quantity}</span>
                        <button type="button" onClick={() => { this.increaseQuantity(cartItem); }} className="quantity-change--action"><IconPlus size={16} color={primaryBrand} /></button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-item--info--right">
                    <div>
                      <div className="cart-item--info-price">${dataService.displayPrice(cartItem.item.basePrice * cartItem.quantity)}</div>
                      <div className="cart-item--info-price-info">${dataService.displayPrice(cartItem.item.basePrice)} x {cartItem.quantity}</div>
                    </div>
                    <button type="button" onClick={() => { this.removeItem(cartItem); }} className="cart-item--info-delete"><IconTrash color={primaryBrand} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={this.goToMenu} className="secondary-action">Add another item</button>
        <div className="tip-area">
          <div className="tip-area--label">
            Add tip
          </div>
          <div className="tip-area--options">
            {tipOptions.map((tip, index) => {
              return (
                <div onClick={() => { this.setState({ tipPercent: tip }); }} key={index} className={`tip-option ${tipPercent === tip ? 'active' : ''}`}>
                  <div className="tip-option--primary">{tip}%</div>
                  <div className="tip-option--secondary">${dataService.displayPrice(this.baseTotal * (tip * 0.01))}</div>
                </div>
              );
            })}
          </div>
        </div>
        <input type="text" className="promo-code" value={promoCode} onChange={event => { this.setState({ promoCode: event.target.value }); }} placeholder="Add a promo code" />
        <button onClick={this.signInPoints} className="tertiary-action">Sign in to use points</button>
        <div className="cart-summary">
          <div className="cart-summary--row">
            <span className="cart-summary--row--primary">Subtotal</span>
            <span className="cart-summary--row--secondary">${dataService.displayPrice(this.baseTotal)}</span>
          </div>
          <div className="cart-summary--row">
            <span className="cart-summary--row--primary">Tax</span>
            <span className="cart-summary--row--secondary">${dataService.displayPrice(tax)}</span>
          </div>
          <div className="cart-summary--row">
            <span className="cart-summary--row--primary">Tip</span>
            <span className="cart-summary--row--secondary">${dataService.displayPrice(currentTip)}</span>
          </div>
          <div className="cart-summary--row important">
            <span className="cart-summary--row--primary">Total</span>
            <span className="cart-summary--row--secondary">${dataService.displayPrice(this.baseTotal + currentTip + tax)}</span>
          </div>
        </div>
      </div>
    );
  }

  private get emptyCart(): React.ReactNode {
    return (
      <div className="empty-cart">
        <h2>Cart is empty</h2>
        <button onClick={this.goToMenu} className="empty-cart--action">Add items</button>
      </div>
    );
  }

  render (): React.ReactNode {
    return (
      <div className={`cart standard-top-padding ${this.cartHasContent ? 'has-floating-button' : ''}`}>
        <h1>Cart</h1>
        <div className="cart-items">
          {this.cartHasContent ? this.cartView : this.emptyCart}
        </div>
        {this.cartHasContent && <FloatingButton text="Check out" kind="primary" onClick={this.checkOut} />}
      </div>
    );
  }
}

export default withRouter(Cart);
