import React from 'react';

export default class IconLeftCaret extends React.Component<{ color: string }> {
  render (): React.ReactNode {
    const { color } = this.props;

    return (
      <svg id="icon-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: 24, height: 24 }}>
        <path d="M15 18L9.3146 12.7071C8.89511 12.3166 8.89511 11.6834 9.3146 11.2929L15 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
