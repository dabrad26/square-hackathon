import React from 'react';

export default class IconHorizontalMenu extends React.Component<{ color: string }> {
  render (): React.ReactNode {
    const { color } = this.props;

    return (
      <svg id="icon-horizontal-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: 24, height: 24 }}>
       <path d="M12.6154 11.6154C12.6154 11.9553 12.3399 12.2308 12 12.2308C11.6601 12.2308 11.3846 11.9553 11.3846 11.6154C11.3846 11.2755 11.6601 11 12 11C12.3399 11 12.6154 11.2755 12.6154 11.6154Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path> <path d="M20 11.6154C20 11.9553 19.7245 12.2308 19.3846 12.2308C19.0447 12.2308 18.7692 11.9553 18.7692 11.6154C18.7692 11.2755 19.0447 11 19.3846 11C19.7245 11 20 11.2755 20 11.6154Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path> <path d="M5.23077 11.6154C5.23077 11.9553 4.95525 12.2308 4.61538 12.2308C4.27552 12.2308 4 11.9553 4 11.6154C4 11.2755 4.27552 11 4.61538 11C4.95525 11 5.23077 11.2755 5.23077 11.6154Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path> <path d="M12.6154 11.6154C12.6154 11.9553 12.3399 12.2308 12 12.2308C11.6601 12.2308 11.3846 11.9553 11.3846 11.6154C11.3846 11.2755 11.6601 11 12 11C12.3399 11 12.6154 11.2755 12.6154 11.6154Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path> <path d="M20 11.6154C20 11.9553 19.7245 12.2308 19.3846 12.2308C19.0447 12.2308 18.7692 11.9553 18.7692 11.6154C18.7692 11.2755 19.0447 11 19.3846 11C19.7245 11 20 11.2755 20 11.6154Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path> <path d="M5.23077 11.6154C5.23077 11.9553 4.95525 12.2308 4.61538 12.2308C4.27552 12.2308 4 11.9553 4 11.6154C4 11.2755 4.27552 11 4.61538 11C4.95525 11 5.23077 11.2755 5.23077 11.6154Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
