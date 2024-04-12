import React from 'react';

export default class IconNav extends React.Component<{ color: string, size?: number }> {
  render (): React.ReactNode {
    const { color, size } = this.props;

    return (
      <svg id="icon-minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: size || 24, height: size || 24 }}>
       <path d="M18.1832 4.12211C19.2612 3.62456 20.3754 4.73878 19.8779 5.81682L13.6743 19.2579C13.1748 20.3402 11.5963 20.2087 11.2827 19.0588L10.1158 14.7802C9.99684 14.344 9.65603 14.0032 9.21976 13.8842L4.94123 12.7173C3.79127 12.4037 3.65984 10.8252 4.74208 10.3257L18.1832 4.12211Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke="#131214" fill="none"></path>
      </svg>
    );
  }
}
