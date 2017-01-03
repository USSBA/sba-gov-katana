import React from 'react';
import styles from '../../styles/homepage/start-your-business.scss';
import sYBImage from '../../../../public/assets/images/homepage/start-image.jpg';
import diagonalLines from '../../../../public/assets/images/homepage/diagonal-lines.png';

export const StartYourBusinessSection = (props) => <div className={ styles.sybContainer }>
                                                     <p>Start your business.</p>
                                                     <img className={ styles.sybBanner } src={ sYBImage } alt="Start your own business." />
                                                     <div className={ styles.sybAccentBox }>
                                                       <ul>
                                                         <li><a href="https://www.sba.gov/starting-business/how-start-business/10-steps-starting-business">10 steps to get started.</a></li>
                                                         <li><a href="https://www.sba.gov/tools/local-assistance#locations-page">Find local mentoring and support</a></li>
                                                         <li><a href="https://www.sba.gov/tools/business-plan/1?from_mobile=true">Create a business plan</a></li>
                                                       </ul>
                                                       <img src={ diagonalLines } />
                                                     </div>
                                                   </div>

