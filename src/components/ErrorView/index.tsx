import React from 'react';
import errorImage from './error.png';
import './styles.scss';

export default class ErrorView extends React.Component<{ text: string }> {
  render (): React.ReactNode {
    const { text } = this.props;

    return (
      <div className="error">
        <div className="error--image">
          <img src={errorImage as string} title="Error" alt="Error" />
        </div>
        <div className="error--text">
          {text}
        </div>
      </div>
    );
  }
}
