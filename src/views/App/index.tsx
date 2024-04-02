import React from 'react';
import './App.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';

class App extends React.Component<RouteComponentProps> {
  componentDidMount (): void {
    const { history } = this.props;
    const route = localStorage.getItem('route');

    if (route) {
      localStorage.removeItem('route');
      history.push(route);
    }
  }

  render (): React.ReactNode {
    return (
      <div className="square-hackathon">
        Hello Square Hackathon Project for Photo Wall!
      </div>
    );
  }
}

export default withRouter(App);
