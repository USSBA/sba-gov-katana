import React from 'react';
import styles from '../../styles/homepage/finance-your-business.scss';
import fYBImage from '../../../../public/assets/images/homepage/finance.jpg';
import diagonalLines from '../../../../public/assets/images/homepage/diagonal-lines.png';

export const FinanceYourBusinessSection = (props) => <div className={styles.fybContainer}>
                                                        <p>Finance your business.</p>
                                                        <img className={styles.fybBanner} src={fYBImage} alt="Finance your business." />
                                                        <div className={styles.fybAccentBox}>
                                                            <ul>
                                                                <li><a href="#">What SBA offers</a></li>
                                                                <li><a href="#">Loan programs</a></li>
                                                                <li><a href="#">Connect with SBA lenders</a></li>
                                                            </ul>
                                                            <img src={diagonalLines}/>
                                                        </div>
                                                    </div>