import React from 'react';
import styles from './caption-text.scss'


 const CaptionText = (props) =>
 <div>
  <p className={styles.CaptionText}>{props.text}</p>
 </div>
 ;

 export default CaptionText;
