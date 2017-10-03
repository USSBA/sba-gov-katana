import React from 'react';
import s from './arrow-anchor-button.scss';

class ArrowAnchorButton extends React.Component {
  render() {
    return (
      <div>
        <a
          href="#paragraph-1"
          onClick={() => {
            this.props.onClick();
          }}>
          <div className={s.container}>
            <i className={`fa fa-angle-down ${s.arrow}`} aria-hidden="true" />
          </div>
        </a>
      </div>
    );
  }
}

export default ArrowAnchorButton;
