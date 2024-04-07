import React from 'react';

export default class IconPlus extends React.Component<{ color: string }> {
  render (): React.ReactNode {
    const { color } = this.props;

    return (
      <svg id="icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: 24, height: 24 }}>
       <path d="M12 4L12 20M20 12L4 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
