import React from 'react';
import styles from './small-secondary-button.scss';

const SmallSecondaryButton = (props) => <div>
  <button className={styles.SmallSecondaryButton} href={props.URL} onClick={props.onClick}>{props.text}</button>
</div>;

export default SmallSecondaryButton;
