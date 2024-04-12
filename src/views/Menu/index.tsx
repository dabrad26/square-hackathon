import React from 'react';
import './styles.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import { type MenuItem } from '../../interfaces/SquareData';
import dataService from '../../services/DataService';
import { backupImage } from '../../styles/images';

class Menu extends React.Component<RouteComponentProps> {
  private get itemsByCategories(): Array<{ name: string, items: MenuItem[] }> {
    const otherItems = dataService.menuItems.filter(item => !item.category_id);
    const returnData: Array<{ name: string, items: MenuItem[] }> = [];

    dataService.categoryItems.forEach(cat => {
      returnData.push({
        name: cat.name,
        items: dataService.menuItems.filter(menu => menu.category_id === cat.id),
      });
    });

    if (otherItems.length) {
      returnData.push({
        name: 'Other',
        items: otherItems,
      });
    }

    return returnData.filter(item => !!item.items.length);
  }

  private openMenuItem = (foodId: string): void => {
    const { history } = this.props;

    history.push(`/menu/${foodId}`);
  };

  render (): React.ReactNode {
    return (
      <div className="menu">
        <h1>Full menu</h1>
        {this.itemsByCategories.map((item, index) => {
          return (
            <div key={index} className="menu-group">
              <h2 className="menu-group--label">{item.name}</h2>
              <div className="menu-group--items">
                {item.items.map((food, foodIndex) => {
                  return (
                    <div onClick={() => { this.openMenuItem(food.id); }} key={`${index}-${foodIndex}`} className="menu-group--item">
                      <div className="menu-group--item--image" title={food.name} style={{ backgroundImage: `url(${food.image ? food.image : backupImage})` }} />
                      <div className="menu-group--item--info">
                        <div className="menu-group--item--info-name">{food.name}</div>
                        {!!food.description && <div className="menu-group--item--info-description" title={food.description}>{food.description}</div>}
                        {!!food.basePrice && <div className="menu-group--item--info-price">${dataService.displayPrice(food.basePrice)}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(Menu);
