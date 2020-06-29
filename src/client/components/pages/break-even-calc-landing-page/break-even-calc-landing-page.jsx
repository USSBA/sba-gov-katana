import React from 'react'
import { Button, DecorativeDash } from 'atoms'
import Accordion from '../../organisms/accordion/accordion'
import styles from './break-even-calc-landing-page.scss'
import { faqFields, benefitFields } from './content'

class BreakEvenCalculatorPage extends React.Component {
  calloutContent = {
    title: "What you'll need to get started",
    text:
      'This analysis will help you easily prepare an estimate and visual to include in your business plan. We’ll do the math and all you will need is an idea of the following information.'
  }
  render() {
    return (
      <div className={styles.calcLandingPageContainer}>
        <div className={styles.infoSection}>
          <h1>Break-even point analysis</h1>
          <p>
            The <strong>break-even point</strong> is the point at which total cost and total revenue are
            equal, meaning there is no loss or gain for your small business. In other words, you've reached
            the level of production at which the costs of production equal the revenues for a product.
          </p>
          <p>
            This is an important calculation for your business plan. Potential investors in a business not
            only want to know the return to expect on their investments, but also the point when they will
            realize this return. This is because some companies may take years before turning a profit,
            often losing money in the first few months or years before breaking even. For this reason,
            break-even points are an important part of any business plan presented to a potential investor.
            It can also be a useful tool in future planning for existing businesses to prove their potential
            turn around after disaster scenarios.
          </p>
          <h3>Benefits of doing break-even analysis</h3>
          <div className={styles.benefits}>
            {benefitFields.map(benefit => (
              <div className={styles.benefitsCol}>
                <p className={styles.subHeading}>{benefit.title}</p>
                <p className={styles.benefitsContent}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.gradientBackground}>
          <div className={styles.infoContainer}>
            <div className={styles.row}>
              <div className={styles.calcImage}>
                <img src="/assets/images/break-even-calculator/Calculator_icon.svg" alt="calculator icon" />
              </div>
              <div className={styles.calcText}>
                Get started with the
                <h3>Break-even Point Analysis Tool</h3>
              </div>
              <p>
                Create your break-even analysis with this calculator and determine your business’s
                break-even point using the following formula:
              </p>
            </div>
            <div className={styles.formula}>
              Fixed Costs ÷ (Price - Variable Costs) = Break-Even Point in Units
            </div>
            <div className={styles.calloutCard}>
              <h3>{this.calloutContent.title}</h3>
              <p>{this.calloutContent.text}</p>
              <div className={styles.bottomRow}>
                <ul>
                  <li>
                    Your business's estimated <strong>fixed costs</strong>
                  </li>
                  <li>
                    Your business's selling <strong>price per unit</strong>
                  </li>
                  <li>
                    Your business's projected <strong>unit sales</strong>
                  </li>
                  <li>
                    Your business's projected <strong>variable costs</strong>
                  </li>
                </ul>
                <div className={styles.buttonContainer}>
                  <Button primary>Start Analysis</Button>
                </div>
              </div>
            </div>
            <div className={styles.accordionContainer}>
              <h3>Calculator Tips and Tricks</h3>
              <DecorativeDash width={77} />
              <div className={styles.accordionContent}>
                {faqFields.map(faq => (
                  <Accordion title={faq.question} content={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BreakEvenCalculatorPage
