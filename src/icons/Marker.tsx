import React from 'react';

export default class IconMarker extends React.Component<{ color: string, size?: number }> {
  render (): React.ReactNode {
    const { color, size } = this.props;

    return (
      <svg id="icon-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: size || 24, height: size || 24 }}>
       <path d="M18.7292 10.8148C18.7292 14.4197 15.577 17.6744 13.5603 19.3877C12.5993 20.2041 11.2295 20.2041 10.2686 19.3877C8.25185 17.6743 5.09961 14.4197 5.09961 10.8148C5.09961 9.00741 5.8176 7.27404 7.09562 5.99601C8.37365 4.71799 10.107 4 11.9144 4C13.7218 4 15.4552 4.71799 16.7332 5.99601C18.0112 7.27404 18.7292 9.00741 18.7292 10.8148Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="white"></path>
       <path d="M11.9144 13.0864C13.169 13.0864 14.186 12.0694 14.186 10.8148C14.186 9.56024 13.169 8.54321 11.9144 8.54321C10.6598 8.54321 9.64282 9.56024 9.64282 10.8148C9.64282 12.0694 10.6598 13.0864 11.9144 13.0864Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
