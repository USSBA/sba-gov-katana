import React from 'react'
import styles from './how-it-works.scss'
import howItWorksImg1 from '../../../../../../public/assets/images/lender-match/howItWorksImg1.jpg'
import howItWorksImg2 from '../../../../../../public/assets/images/lender-match/howItWorksImg2.jpg'
import howItWorksImg3 from '../../../../../../public/assets/images/lender-match/howItWorksImg3.jpg'
import howItWorksImg4 from '../../../../../../public/assets/images/lender-match/howItWorksImg4.jpg'

export const HowItWorksSection = props => (
  <div className={styles.section}>
    <h2 className={styles.title}>How it works.</h2>
    <div className={styles.step}>
      <span className={styles.numbers}>1</span>
      <img
        className={styles.img}
        src={howItWorksImg1}
        alt="Hands typing on a laptop."
      />
      <h3 className={styles.header}>Describe your needs</h3>
      <hr className={styles.line} />
      <p className={styles.blurb}>
        Answer a few questions about your business in as little as five minutes.
      </p>
    </div>
    <div className={styles.step}>
      <span className={styles.numbers}>2</span>
      <img className={styles.img} src={howItWorksImg2} alt="A calendar" />
      <h3 className={styles.header}>Get matched in 2 days</h3>
      <hr className={styles.line} />
      <p className={styles.blurb}>
        Receive an email with contact information of lenders who express
        interest in your loan.
      </p>
    </div>
    <div className={styles.step}>
      <span className={styles.numbers}>3</span>
      <img
        className={styles.img}
        src={howItWorksImg3}
        alt="Two people in discussion around a conference table."
      />
      <h3 className={styles.header}>Talk to lenders</h3>
      <hr className={styles.line} />
      <p className={styles.blurb}>Compare rates, terms, fees, and more.</p>
    </div>
    <div className={styles.step}>
      <span className={styles.numbers}>4</span>
      <img className={styles.img} src={howItWorksImg4} alt="A piggy bank." />
      <h3 className={styles.header}>Apply for a loan</h3>
      <hr className={styles.line} />
      <p className={styles.blurb}>
        Submit loan applications and paperwork. You're well on your way to
        securing a business loan!
      </p>
    </div>
  </div>
)
