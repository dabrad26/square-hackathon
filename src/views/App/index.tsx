import React from 'react';
import './App.scss';
import { type RouteComponentProps, withRouter } from 'react-router-dom';
import MainView from '../../components/MainView';
import Header from '../../components/Header';
import dataService from '../../services/DataService';
import Loading from '../../components/Loading';
import ErrorView from '../../components/ErrorView';

class App extends React.Component<RouteComponentProps> {
  state = {
    loading: true,
    error: false,
  };

  private get isIOS(): boolean {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform);
  }

  componentDidMount (): void {
    const { history } = this.props;
    const route = localStorage.getItem('route');

    if (route) {
      localStorage.removeItem('route');
      history.push(route);
    }

    dataService.init().then(() => {
      this.setState({ loading: false });
    }).catch(error => {
      console.error('App: Unable to start', error);
      this.setState({ loading: false, error: true });
    });
  }

  render (): React.ReactNode {
    const { loading, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorView text="Unable to load needed resources." />;
    }

    return (
      <div className={`app-root ${this.isIOS ? 'ios-device' : ''}`}>
        <Header />
        <MainView />
      </div>
    );
  }
}

export default withRouter(App);
