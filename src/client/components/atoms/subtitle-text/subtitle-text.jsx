import React from 'react';
import styles from './subtitle-text.scss'


 const SubtitleText= (props) =>
 <div>
  <h5 className={styles.SubtitleText}>{props.text}</h5>
 </div>;

 export default SubtitleText;
