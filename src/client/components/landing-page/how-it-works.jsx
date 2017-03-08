import React from 'react';
import styles from '../../styles/landing-page/how-it-works.scss';
import howItWorksImg1 from '../../../../public/assets/images/lender-match/howItWorksImg1.jpg';
import howItWorksImg2 from '../../../../public/assets/images/lender-match/howItWorksImg2.jpg';
import howItWorksImg3 from '../../../../public/assets/images/lender-match/howItWorksImg3.jpg';
import howItWorksImg4 from '../../../../public/assets/images/lender-match/howItWorksImg4.jpg';


export const HowItWorksSection = (props) => <div className={ styles.sectionWrapper }>
                                              <p className={ styles.sectionTitle }>How it works.</p>
                                              <div className={ styles.sectionItemWrapper }>
                                                <ul className={ styles.sectionItem }>
                                                  <li><div className={ styles.sectionImage }><p>1</p><img src={ howItWorksImg1 } alt="Describe your needs" /></div></li>
                                                  <li>
                                                    <p className={ styles.sectionItemTitle }>Describe your needs</p>
                                                  </li>
                                                  <li>
                                                    <div className={ styles.line }></div>
                                                  </li>
                                                  <li>
                                                    <p className={ styles.sectionItemDescription }>Answer a few questions about your business in as little as five minutes.</p>
                                                  </li>
                                                </ul>
                                                <ul className={ styles.sectionItem }>
                                                  <li><div className={ styles.sectionImage }><p>2</p><img src={ howItWorksImg2 } alt="Get matched in 2 days" /></div></li>
                                                  <li>
                                                    <p className={ styles.sectionItemTitle }>Get matched in 2 days</p>
                                                  </li>
                                                  <li>
                                                    <div className={ styles.line }></div>
                                                  </li>
                                                  <li>
                                                    <p className={ styles.sectionItemDescription }>Receive an email with contact information of lenders who express interest in your loan.</p>
                                                  </li>
                                                </ul>
                                                <ul className={ styles.sectionItem }>
                                                  <li><div className={ styles.sectionImage }><p>3</p><img src={ howItWorksImg3 } alt="Talk to lenders" /></div></li>
                                                  <li>
                                                    <p className={ styles.sectionItemTitle }>Talk to lenders</p>
                                                  </li>
                                                  <li>
                                                    <div className={ styles.line }></div>
                                                  </li>
                                                  <li>
                                                    <p className={ styles.sectionItemDescription }>Compare rates, terms, fees, and more.</p>
                                                  </li>
                                                </ul>
                                                <ul className={ styles.sectionItem }>
                                                  <li><div className={ styles.sectionImage }><p>4</p><img src={ howItWorksImg4 } alt="Apply for a loan" /></div></li>
                                                  <li>
                                                    <p className={ styles.sectionItemTitle }>Apply for a loan</p>
                                                  </li>
                                                  <li>
                                                    <div className={ styles.line }></div>
                                                  </li>
                                                  <li>
                                                    <p className={ styles.sectionItemDescription }>Submit loan applications and paperwork. You're well on your way to securing a business loan!</p>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>