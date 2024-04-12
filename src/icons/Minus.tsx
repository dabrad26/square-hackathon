import React from 'react';

export default class IconMinus extends React.Component<{ color: string, size?: number }> {
  render (): React.ReactNode {
    const { color, size } = this.props;

    return (
      <svg id="icon-minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: size || 24, height: size || 24 }}>
       <path d="M20 12L4 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
