import React from 'react';
import styles from '../../styles/homepage/start-your-business.scss';
import sYBImage from '../../../../public/assets/images/homepage/start-image.jpg';
import diagonalLines from '../../../../public/assets/images/homepage/diagonal-lines.png';
import diagonalLinesMobile from '../../../../public/assets/images/homepage/diagonal-lines-mobile.png';

export const StartYourBusinessSection = (props) => <div className={ styles.sybContainer }>
                                                     <p>Start your business.</p>
                                                     <img className={ styles.sybBanner } src={ sYBImage } alt="Start your own business." />
                                                     <div className={ styles.sybAccentBox }>
                                                       <ul>
                                                         <a href="https://www.sba.gov/starting-business/how-start-business/10-steps-starting-business">
                                                           <li className={ styles.borderBox }>10 steps to get started</li>
                                                         </a>
                                                         <a href="/tools/local-assistance#locations-page">
                                                           <li className={ styles.borderBox }>Find local mentoring and support</li>
                                                         </a>
                                                         <a href="/tools/business-plan/1?from_mobile=true">
                                                           <li>Create a business plan</li>
                                                         </a>
                                                       </ul>
                                                       <img className="hidden-xs" src={ diagonalLines } alt="" />
                                                       <img className="visible-xs" src={ diagonalLinesMobile } alt="" />
                                                     </div>
                                                   </div>

