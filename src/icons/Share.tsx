import React from 'react';

export default class IconShare extends React.Component<{ color: string }> {
  render (): React.ReactNode {
    const { color } = this.props;

    return (
      <svg id="icon-share" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: 24, height: 24 }}>
       <path d="M5.59961 12L5.59961 17C5.59961 18.6569 6.94276 20 8.59961 20H15.3996C17.0565 20 18.3996 18.6569 18.3996 17V12M15.1996 7.2L11.9996 4M11.9996 4L8.79961 7.2M11.9996 4V14.4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
