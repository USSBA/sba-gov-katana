import React from 'react'

import styles from './break-even-calc-landing-page.scss'

class BreakEvenCalculatorPage extends React.Component {
  render() {
    return (
      <>
        <div className={styles.infoSection}>
          <h1>Break-even point analysis</h1>
          <h5>
            The Break-even point (BEP) is the point at which total cost and total revenue are equal. Meaning
            there is no loss or gain - for your small business. In other words, the break-even point is the
            level of production at which the costs of production equal the revenues for a product.
          </h5>
          <h3>An important calculation for your business plan</h3>
          <p>
            Potential investors in a business not only want to know the return to expect on their
            investments but also the point when they will realize this return. This is because some
            companies may take years before turning a profit, often losing money in the first few months or
            years before breaking even. For this reason, break-even points are an important part of any
            business plan presented to a potential investor. It can also be a useful tool in future planning
            for existing businesses to prove their potential turn around after disaster scenarios.{' '}
          </p>
        </div>
        <div className={styles.gradientBackground}></div>
      </>
    )
  }
}

export default BreakEvenCalculatorPage
