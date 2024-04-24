import React from 'react';

export default class IconSmile extends React.Component<{ color: string }> {
  render (): React.ReactNode {
    const { color } = this.props;

    return (
      <svg id="smile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: 20, height: 20 }}>
        <path d="M8.8 13.6C8.8 13.6 10 15.2 12 15.2C14 15.2 15.2 13.6 15.2 13.6M9.608 10V9.6M14.4 9.6C14.4 10 14.4 10 14.4 10M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
