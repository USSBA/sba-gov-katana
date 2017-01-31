import React from 'react';
import styles from '../../styles/homepage/finance-your-business.scss';
import diagonalLines from '../../../../public/assets/images/homepage/diagonal-lines.png';
import diagonalLinesMobile from '../../../../public/assets/images/homepage/diagonal-lines-mobile.png';

export const FinanceYourBusinessSection = (props) => <div className={ styles.fybContainer }>
                                                       <p>Finance your business.</p>
                                                       <img className={ styles.fybBanner } src={ "https://s3.amazonaws.com/fearlesstesters.com/img/finance.jpg" } alt="Finance your business." />
                                                       <div className={ styles.fybAccentBox }>
                                                         <ul>
                                                           <a href="/loans-grants/see-what-sba-offers/what-sba-offers-help-small-businesses-grow">
                                                             <li className={ styles.borderBox }>What SBA offers</li>
                                                           </a>
                                                           <a href="/loans-grants/see-what-sba-offers/sba-loan-programs">
                                                             <li className={ styles.borderBox }>Loan programs</li>
                                                           </a>
                                                           <a href="/tools/linc">
                                                             <li>Connect with SBA lenders</li>
                                                           </a>
                                                         </ul>
                                                         <img className="hidden-xs" src={ diagonalLines } alt="" />
                                                         <img className="visible-xs" src={ diagonalLinesMobile } alt="" />
                                                       </div>
                                                     </div>
