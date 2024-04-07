import React from 'react';

export default class IconCheck extends React.Component<{ color: string }> {
  render (): React.ReactNode {
    const { color } = this.props;

    return (
      <svg id="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: 24, height: 24 }}>
        <path d="M20 6.94995L10.4142 16.5357C9.63317 17.3168 8.36683 17.3168 7.58579 16.5357L4 12.95" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
