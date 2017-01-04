import React from 'react';
import styles from '../../styles/homepage/sell-to-govt.scss';
import sTGImage from '../../../../public/assets/images/homepage/contract.jpg';
import diagonalLines from '../../../../public/assets/images/homepage/diagonal-lines.png';

export const SellToGovtSection = (props) => <div className={ styles.stgContainer }>
                                              <p>Sell to the government.</p>
                                              <img className={ styles.stgBanner } src={ sTGImage } alt="Sell to the government." />
                                              <div className={ styles.stgAccentBox }>
                                                <ul>
                                                  <li><a href="https://www.sba.gov/contracting/getting-started-contractor">Is government contracting for me?</a></li>
                                                  <li><a href="https://www.sba.gov/contracting/resources-small-businesses/government-contracting-classroom">Contracting classroom</a></li>
                                                  <li><a href="https://www.sba.gov/tools/size-standards-tool">Quality for government contracts</a></li>
                                                </ul>
                                                <img src={ diagonalLines } alt=""/>
                                              </div>
                                            </div>

