import React from 'react';
import ButtonBase from "../button-base/button-base.jsx"
import styles from './small-primary-form-button.scss';

 const SmallPrimaryFormButton = (props) => <ButtonBase {...props} buttonClassName={styles.SmallPrimaryFormButton}/>;

export default SmallPrimaryFormButton;
