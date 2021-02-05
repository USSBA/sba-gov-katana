import React from 'react'
import { Button, DecorativeDash } from 'atoms'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState
} from 'react-accessible-accordion'
import { isEmpty } from 'lodash'
import { Breadcrumb } from 'molecules'
import styles from './break-even-calc-landing-page.scss'
import accordionStyles from './accordion.scss'
import { fetchRestContent } from '../../../fetch-content-helper'
class BreakEvenCalculatorPage extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  calloutContent = {
    title: 'What you need to get started:',
    text:
      'This analysis will help you easily prepare an estimate and visual to include in your business plan. We’ll do the math and all you will need is an idea of the following information.'
  }

  async componentDidMount() {
    const becNodeId = window.nodeId
    if (!isEmpty(becNodeId)) {
      fetchRestContent(becNodeId).then(becData => {
        const data = this.parseBecData(becData)
        this.setState({ data })
      })
    }
  }

  parseBecData(data) {
    const becData = {}
    let i = 0

    //Parse Break-Even Point Paragraph
    while (data.paragraphs[i].type !== 'sectionHeader') {
      becData.mainParagraph = data.paragraphs[i].text
      i++
    }

    //Parse break-even analysis paragraph
    becData.benefitsTitle = data.paragraphs[i].text
    i++
    becData.benefits = []
    while (data.paragraphs[i].type !== 'sectionHeader') {
      const benefits = {}
      benefits.title = data.paragraphs[i].text
      benefits.content = data.paragraphs[i + 1].text
      becData.benefits.push(benefits)
      i = i + 2
    }

    //Parse Tips and Tricks
    becData.tips = {}
    becData.tips.title = ''
    becData.tips.title = data.paragraphs[i].text
    becData.tips.faqs = []
    i++
    while (i < data.paragraphs.length) {
      const faq = {}
      faq.title = data.paragraphs[i].text
      faq.content = data.paragraphs[i + 1].text
      becData.tips.faqs.push(faq)
      i = i + 2
    }
    return becData
  }

  render() {
    const { data } = this.state
    console.log('data is -->', data)
    return (
      <div data-testid="breakevencalc" className={styles.calcLandingPageContainer}>
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
          {data ? (
            <div>
              <div dangerouslySetInnerHTML={{ __html: data && data.mainParagraph }} />
              <h2 className={styles.benefitsTitle}>{data && data.benefitsTitle}</h2>
              <div className={styles.benefits}>
                {data.benefits &&
                  data.benefits.map(benefit => (
                    <div className={styles.benefitsCol} key={benefit.title}>
                      <h3 className={styles.subHeading}>{benefit.title}</h3>
                      <p
                        className={styles.benefitsContent}
                        dangerouslySetInnerHTML={{ __html: benefit.content }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div>
          <div className={styles.gradientBackground}></div>
          <div className={styles.infoContainer}>
            <div className={styles.row}>
              <div className={styles.calcImage}>
                <img src="/assets/images/break-even-calculator/Calculator_icon.svg" alt="calculator icon" />
              </div>
              <div className={styles.calcText}>
                <h2>Getting Started </h2>
                <h2>Break-Even Point Analysis</h2>
                <p>
                  Create your break-even analysis with this calculator and determine your business’s
                  break-even point in units using the following formula:
                </p>
              </div>
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
                  <Button primary url="breakevenpointcalculator/calculate/">
                    Start Analysis
                  </Button>
                </div>
              </div>
            </div>
            {data ? (
              <div className={accordionStyles.accordionContainer}>
                <h3>{data.tips && data.tips.title}</h3>
                <DecorativeDash width={77} />
                <div className={accordionStyles.accordionContent}>
                  <Accordion allowZeroExpanded>
                    {data.tips &&
                      data.tips.faqs.map(faq => (
                        <AccordionItem key={faq.title}>
                          <AccordionItemHeading className={accordionStyles.accordionHeading}>
                            <AccordionItemButton className={accordionStyles.accordionButton}>
                              <h3>
                                {faq.title}
                                <AccordionItemState>
                                  {({ expanded }) => {
                                    return expanded ? (
                                      <i className={accordionStyles.accordionIcon + ' fa fa-chevron-up'} />
                                    ) : (
                                      <i
                                        className={accordionStyles.accordionIcon + ' fa fa-chevron-down'}
                                      />
                                    )
                                  }}
                                </AccordionItemState>
                              </h3>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div
                              className={accordionStyles.accordionText}
                              dangerouslySetInnerHTML={{ __html: faq.content }}
                            />
                          </AccordionItemPanel>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default BreakEvenCalculatorPage
