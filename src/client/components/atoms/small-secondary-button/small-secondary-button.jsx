import React from 'react';
import styles from './small-secondary-button.scss';

const SmallSecondaryButton = (props) => <div>
  <button id={props.id} className={styles.SmallSecondaryButton} href={props.URL} onClick={props.onClick}disabled={props.disabled}>{props.text}</button>
</div>;

export default SmallSecondaryButton;
