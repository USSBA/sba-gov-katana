import React from 'react'
import { Button, DecorativeDash } from 'atoms'
import { Accordion } from 'organisms'
import styles from './break-even-calc-landing-page.scss'
import { faqFields, benefitFields } from './content'

class BreakEvenCalculatorPage extends React.Component {
  calloutContent = {
    title: 'What you need to get started:',
    text:
      'This analysis will help you easily prepare an estimate and visual to include in your business plan. We’ll do the math and all you will need is an idea of the following information.'
  }
  render() {
    return (
      <div className={styles.calcLandingPageContainer}>
        <div className={styles.breadcrumbSection}>
          <Breadcrumb
            items={[
              {
                title: 'Plan your business',
                url: '/business-guide/plan-your-business/market-research-competitive-analysis'
              },
              {
                title: 'Calculate your startup costs',
                url: '/business-guide/plan-your-business/calculate-your-startup-costs'
              },
              { title: 'Break-even point analysis', url: '/' }
            ]}
          />
        </div>
        <div className={styles.infoSection}>
          <h1>Break-Even Point</h1>
          <p>
            The <strong>break-even point</strong> is the point at which total cost and total revenue are
            equal, meaning there is no loss or gain for your small business. In other words, you've reached
            the level of production at which the costs of production equals the revenues for a product.
          </p>
          <p>
            The <strong>break-even point</strong> is the point at which total cost and total revenue are
            equal, meaning there is no loss or gain for your small business. In other words, you've reached
            the level of production at which the costs of production equal the revenues for a product.
          </p>
          <p>
            For existing businesses, this can be a useful tool not only in analyzing costs and evaluating
            profits they’ll earn at different sales volumes, but also to prove their potential turnaround
            after disaster scenarios.
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
        <div>
          <div className={styles.gradientBackground}></div>
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
                    Your business's estimated <strong>variable cost per unit</strong>
                  </li>
                </ul>
                <div className={styles.buttonContainer}>
                  <Button primary url="breakevenpointcalculator/calculate">
                    Start Analysis
                  </Button>
                </div>
              </div>
            </div>
            <div className={accordionStyles.accordionContainer}>
              <h3>Tips and Tricks</h3>
              <DecorativeDash width={77} />
              <div className={accordionStyles.accordionContent}>
                <Accordion allowZeroExpanded>
                  {faqFields.map(faq => (
                    <AccordionItem key={faq.question}>
                      <AccordionItemHeading className={accordionStyles.accordionHeading}>
                        <AccordionItemButton className={accordionStyles.accordionButton}>
                          <h3>
                            {faq.question}
                            <AccordionItemState>
                              {({ expanded }) => {
                                return expanded ? (
                                  <i className={accordionStyles.accordionIcon + ' fa fa-chevron-up'} />
                                ) : (
                                  <i className={accordionStyles.accordionIcon + ' fa fa-chevron-down'} />
                                )
                              }}
                            </AccordionItemState>
                          </h3>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div
                          className={accordionStyles.accordionText}
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.accordionContainer}>
          <h3>Tips and Tricks</h3>
          <DecorativeDash width={77} />
          <div className={styles.accordionContent}>
            {faqFields.map(faq => (
              <Accordion title={faq.question} content={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default BreakEvenCalculatorPage
