import React from 'react';

export default class IconTrash extends React.Component<{ color: string }> {
  render (): React.ReactNode {
    const { color } = this.props;

    return (
      <svg id="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color={color} fill="none" style={{ width: 24, height: 24 }}>
       <path d="M9.99963 11.5L10.4441 16.1667M13.9996 11.5L13.5552 16.1667M4.34961 7.92453H6.16088M6.16088 7.92453C10.8766 7.92453 19.6334 7.92453 19.6334 7.92453M6.16088 7.92453L6.80569 17.2079C6.91491 18.7803 8.2223 20 9.79848 20H14.2229C15.79 20 17.093 18.7939 17.214 17.2316L17.9345 7.92453C17.9345 7.92453 10.2872 7.92453 6.16088 7.92453ZM8.87791 7.92453V6C8.87791 4.89543 9.77334 4 10.8779 4H13.2175C14.3221 4 15.2175 4.89543 15.2175 6V7.92453" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" stroke={color} fill="none"></path>
      </svg>
    );
  }
}
