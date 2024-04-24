import React from 'react';

export default class IconTime extends React.Component<{ color: string, size?: number }> {
  render (): React.ReactNode {
    const { color, size } = this.props;

    return (
      <svg id="icon-time" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: size || 24, height: size || 24 }}>
       <path d="M12 8V12L14.5 13M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
