/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import FloatingButton from '../../components/FloatingButton';
import { type MenuItem } from '../../interfaces/SquareData';
import dataService from '../../services/DataService';
import Loading from '../../components/Loading';
import ErrorView from '../../components/ErrorView';
import IconMinus from '../../icons/Minus';
import { primaryBrand } from '../../styles/colors';
import IconPlus from '../../icons/Plus';

class MenuDetails extends React.Component<RouteComponentProps<{ id: string }>> {
  state = {
    loading: true,
    error: false,
    quantity: 1,
    specialInstructions: '',
  };

  private currentItem: MenuItem = { variations: [] } as unknown as MenuItem;

  private goBack = (): void => {
    const { history } = this.props;

    history.push('/menu');
  };

  private addToOrder = (): void => {
    const { quantity, specialInstructions } = this.state;

    dataService.addCartItem({
      id: String(new Date().getTime()),
      item: this.currentItem,
      quantity,
      specialInstructions,
    });

    this.goBack();
  };

  private get totalPrice(): number {
    const { quantity } = this.state;

    return quantity * (this.currentItem.basePrice || 0);
  }

  private decreaseQuantity = (): void => {
    const { quantity } = this.state;

    if (quantity === 1) {
      return;
    }

    this.setState({ quantity: quantity - 1 });
  };

  private increaseQuantity = (): void => {
    const { quantity } = this.state;

    this.setState({ quantity: quantity + 1 });
  };

  componentDidMount(): void {
    const { match } = this.props;
    const foundItem = dataService.menuItems.find(item => item.id === match.params.id);

    if (foundItem) {
      this.currentItem = foundItem;
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false, error: true });
    }
  }

  render (): React.ReactNode {
    const { loading, error, quantity, specialInstructions } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorView text="Menu item not found" />;
    }

    return (
      <div className="menu-details has-floating-button standard-top-padding">
        <div className="wrapped-items">
          <h1>{this.currentItem.name}</h1>
          <h2>{dataService.displayPrice(this.currentItem.basePrice)}</h2>
          {!!this.currentItem.description && <div className="description">{this.currentItem.description}</div>}
        </div>
        <div className="picture-area">
          {!!this.currentItem.image && <div className="picture-item" style={{ backgroundImage: `url(${this.currentItem.image})` }} />}
          {dataService.getPhotos(this.currentItem.name).map((item, index) => {
            return <div key={index} className="picture-item" style={{ backgroundImage: `url(${item.url})` }} />;
          })}
        </div>
        <div className="wrapped-items">
          <div className="quantity-change">
            <button type="button" onClick={this.decreaseQuantity} className="quantity-change--action"><IconMinus color={primaryBrand} /></button>
            <span className="quantity-change--count">{quantity}</span>
            <button type="button" onClick={this.increaseQuantity} className="quantity-change--action"><IconPlus color={primaryBrand} /></button>
          </div>
        </div>
        <div className="wrapped-items">
          <input type="text" className="special-instructions" value={specialInstructions} onChange={event => { this.setState({ specialInstructions: event.target.value }); }} placeholder="Special instructions" />
        </div>
        <FloatingButton text={`Add to order $${dataService.displayPrice(this.totalPrice)}`} kind="primary" closeAction={this.goBack} onClick={this.addToOrder} />
      </div>
    );
  }
}

export default withRouter(MenuDetails);
