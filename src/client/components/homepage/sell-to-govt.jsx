import React from 'react';
import styles from '../../styles/homepage/sell-to-govt.scss';
import sTGImage from '../../../../public/assets/images/homepage/contract.jpg';
import diagonalLines from '../../../../public/assets/images/homepage/diagonal-lines.png';
import diagonalLinesMobile from '../../../../public/assets/images/homepage/diagonal-lines-mobile.png';

export const SellToGovtSection = (props) => <div className={ styles.stgContainer }>
                                              <p>Sell to the government.</p>
                                              <img className={ styles.stgBanner } src={ sTGImage } alt="Sell to the government." />
                                              <div className={ styles.stgAccentBox }>
                                                <ul>
                                                  <a href="/contracting/getting-started-contractor">
                                                    <li className={ styles.borderBox }>Is government contracting for me?</li>
                                                  </a>
                                                  <a href="/contracting/resources-small-businesses/government-contracting-classroom">
                                                    <li className={ styles.borderBox }>Contracting classroom</li>
                                                  </a>
                                                  <a href="/tools/size-standards-tool">
                                                    <li>Qualify for government contracts</li>
                                                  </a>
                                                </ul>
                                                <img className="hidden-xs" src={ diagonalLines } alt="" />
                                                <img className="visible-xs" src={ diagonalLinesMobile } alt="" />
                                              </div>
                                            </div>

