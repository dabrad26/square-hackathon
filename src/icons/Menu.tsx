import React from 'react';

export default class IconMenu extends React.Component<{ color: string }> {
  render (): React.ReactNode {
    const { color } = this.props;

    return (
      <svg id="menu-01" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: 24, height: 24 }}>
        <path d="M20 11.6667H4M20 5H4M20 18.3333H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
