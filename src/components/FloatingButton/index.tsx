import React from 'react';
import './styles.scss';
import IconClose from '../../icons/Close';
import { primaryBrand } from '../../styles/colors';

interface FloatingButtonProps {
  text: string
  kind: 'primary' | 'secondary'
  transparent?: boolean
  onClick: () => void
  closeAction?: () => void
}

export default class FloatingButton extends React.Component<FloatingButtonProps> {
  render (): React.ReactNode {
    const { text, kind, transparent, onClick, closeAction } = this.props;

    return (
      <div className={`floating-button ${transparent ? 'transparent-back' : ''}`}>
        <div className="floating-button-wrapper">
          {!!closeAction && <button onClick={closeAction} type="button" className="floating-close"><IconClose color={primaryBrand} /></button>}
          <button type="button" onClick={onClick} className={`floating-action ${kind} `}>{text}</button>
        </div>
      </div>
    );
  }
}
