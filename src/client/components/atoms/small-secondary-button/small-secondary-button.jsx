import React from 'react';
import ButtonBase from "../button-base/button-base.jsx"
import styles from './small-secondary-button.scss';

const SmallSecondaryButton = (props) => <ButtonBase {...props} buttonClassName={styles.SmallSecondaryButton}/>;

export default SmallSecondaryButton;
