import React from 'react';
import './styles.scss';
import ErrorView from '../ErrorView';
import type PhotoItem from '../../interfaces/Photo';

export default class PhotoWallArea extends React.Component<{ className?: string, pictures: PhotoItem[], openItem: (item: PhotoItem) => void }> {
  private get rows(): number {
    const wrapper = document.querySelector('#picture-wrapper');

    if (wrapper) {
      return Math.floor(wrapper.clientHeight / 128);
    }

    return 3;
  }

  private resizeEvent = (): void => {
    this.setState({});
  };

  componentDidMount(): void {
    window.addEventListener('resize', this.resizeEvent);
    this.setState({});
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.resizeEvent);
  }

  render (): React.ReactNode {
    const { pictures, openItem, className } = this.props;

    const groupItems: React.ReactNode[] = [];
    const totalRows = this.rows;
    const itemsPerRow = Math.ceil(pictures.length / totalRows);

    for (let i = 0; i < totalRows; i++) {
      const start = i * itemsPerRow;
      const end = start + itemsPerRow;

      groupItems.push(
        <div className="picture-group" key={`${start}-${end}`}>
          {pictures.slice(start, end).map((item, index) => {
            return <button key={index} onClick={() => { openItem(item); }} className="picture-item" style={{ backgroundImage: `url(${item.url})` }} />;
          })}
        </div>,
      );
    }

    return (
      <div className={`photo-wall-area ${className || ''}`}>
        <div className="picture-area" id="picture-wrapper">
          {pictures.length
            ? groupItems.map(item => {
              return item;
            })
            : <ErrorView text="No pictures found" />}
        </div>
      </div>
    );
  }
}
