import React from 'react';
import { Switch, Route, withRouter, type RouteComponentProps } from 'react-router-dom';
import PhotoWall from '../../views/PhotoWall';
import Submit from '../../views/Submit';
import ReviewDetails from '../../views/ReviewDetails';
import Menu from '../../views/Menu';
import MenuDetails from '../../views/MenuDetails';
import Cart from '../../views/Cart';

class MainView extends React.Component<RouteComponentProps> {
  render (): React.ReactNode {
    return (
      <div className="main-view">
        <Switch>
          <Route exact={true} path="/">
            <PhotoWall />
          </Route>
          <Route path="/submit">
            <Submit />
          </Route>
          <Route path="/photos" exact={true}>
            <PhotoWall />
          </Route>
          <Route path="/review/:id">
            <ReviewDetails />
          </Route>
          <Route path="/menu" exact={true}>
            <Menu />
          </Route>
          <Route path="/menu/:id">
            <MenuDetails />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="*">
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainView);
