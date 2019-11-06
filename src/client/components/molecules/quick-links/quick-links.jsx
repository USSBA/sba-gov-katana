import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import queryString from 'querystring'
import { chain, isEmpty } from 'lodash'
import { DecorativeDash, Link } from 'atoms'
import styles from './quick-links.scss'
import { fetchSiteContent } from '../../../fetch-content-helper'

const MAX_TITLE_LENGTH = 80

function getCurrentFile(files) {
  let found = null

  if (files) {
    found = chain(files)
      .filter(item => {
        return moment(item.effectiveDate).isSameOrBefore(moment())
      })
      .sortBy('effectiveDate')
      .last()
      .value()
  }

  return found
}

function formatDate(date) {
  return moment(date).format('MMM D, YYYY')
}

const valueOrAll = value => {
  return isEmpty(value[0]) ? 'all' : value[0]
}

class QuickLinks extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      documents: [],
      LOADING_STATE: 'unloaded'
    }
  }

  async componentDidMount() {
    this.setState(
      {
        LOADING_STATE: 'isLoading'
      },
      async () => {
        this.setState({
          documents: await this.fetchDocuments(),
          articles: await this.fetchArticles(),
          LOADING_STATE: 'isLoaded'
        })
      }
    )
  }

  async fetchDocuments() {
    const results = {}
    const { typeOfLinks } = this.props.data

    for (const [index, quickLink] of typeOfLinks.entries()) {
      const { documentActivity, documentOffice, documentType, documentProgram, type } = quickLink
      if (type === 'documentLookup') {
        results[`documents-${index}`] = await fetchSiteContent('documents', {
          sortBy: 'Last Updated',
          type: valueOrAll(documentType),
          program: valueOrAll(documentProgram),
          activity: valueOrAll(documentActivity),
          office: documentOffice || 'all',
          start: 0,
          end: 3
        })
      }
    }

    return results
  }

  async fetchArticles() {
    const results = {}
    const { typeOfLinks } = this.props.data

    for (const [index, quickLink] of typeOfLinks.entries()) {
      const { articleCategory, articleProgram, type } = quickLink

      if (type === 'articleLookup') {
        results[`articles-${index}`] = await fetchSiteContent('articles', {
          sortBy: 'Last Updated',
          articleCategory: valueOrAll(articleCategory),
          program: valueOrAll(articleProgram),
          start: 0,
          end: 3
        })
      }
    }

    return results
  }

  generateGrid(length) {
    const gridClass = { 1: styles.oneCard, 2: styles.twoCards }
    return length > 2 ? styles.manyCards : gridClass[length]
  }

  renderQuickLinks() {
    const {
      data: { typeOfLinks }
    } = this.props
    const { documents, articles, LOADING_STATE } = this.state
    const gridClass = this.generateGrid(typeOfLinks.length)

    return typeOfLinks.map((quickLink, index) => {
      if (quickLink.type === 'documentLookup') {
        return (
          <LatestDocumentsCard
            key={index}
            className={styles.card + ' ' + gridClass}
            documents={documents['documents-' + index]}
            LOADING_STATE={LOADING_STATE}
            {...quickLink}
          />
        )
      } else if (quickLink.type === 'ratesList') {
        return <RatesCard key={index} {...quickLink} className={styles.card + ' ' + gridClass} />
      } else if (quickLink.type === 'articleLookup') {
        return (
          <ArticlesCard
            key={index}
            className={styles.card + ' ' + gridClass}
            articles={articles['articles-' + index]}
            {...quickLink}
          />
        )
      }

      return null
    })
  }

  render() {
    return (
      <div className={styles.collection} data-testid="quick-links">
        {this.props.data ? this.renderQuickLinks() : <div>loading</div>}
      </div>
    )
  }
}

const LatestDocumentsCard = props => {
  const eventCategory = `${props.sectionHeaderText.toLowerCase()}-module`
  const { LOADING_STATE } = props
  return (
    <div data-testid="documents-card" className={props.className}>
      <div className={styles.titleContainer}>
        <h4 data-testid="header" className={styles.title}>
          {props.sectionHeaderText}
        </h4>
        <Link
          data-testid="see-all-link"
          to={`/document?${queryString.stringify({
            type: props.documentType,
            program: props.documentProgram,
            office: props.documentOffice || 'all'
          })}`}
        >
          See all
        </Link>
      </div>
      <DecorativeDash width={30} />
      <div className={styles.list}>
        {LOADING_STATE === 'isLoading' && <div>Loading</div>}
        {LOADING_STATE === 'isLoaded' && (
          <div>
            {!isEmpty(props.documents) && props.documents.items.length > 0 ? (
              props.documents.items.map((doc, index) => {
                const currentFile = getCurrentFile(doc.files)
                let effectiveDate
                if (currentFile && currentFile.effectiveDate) {
                  effectiveDate = currentFile.effectiveDate
                }

                // Add a prefix to SOPs with the format {DOC_TYPE} {DOC_NUMBER} ({DOC_VERSION}) - {DOC_TITLE}
                let titlePrefix = ''
                if (doc.documentIdType === 'SOP' && !isEmpty(doc.documentIdNumber)) {
                  titlePrefix = doc.documentIdType + ' ' + doc.documentIdNumber + ' - '
                }
                const linkTitle =
                  /* eslint-disable-next-line no-magic-number */
                  titlePrefix +
                  (doc.title.length > MAX_TITLE_LENGTH
                    ? doc.title.slice(0, MAX_TITLE_LENGTH + 10) + '...'
                    : doc.title)
                return (
                  <div key={index}>
                    <Link data-testid="document-link" to={doc.url}>
                      {linkTitle}
                    </Link>
                    {effectiveDate && (
                      <div data-testid="document-date" className={styles.date}>
                        {formatDate(effectiveDate)}
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div data-testid="no-results">
                <p>No documents found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const RatesCard = props => {
  return (
    <div className={props.className}>
      <h4 className={styles.title}>Rates</h4>
      <DecorativeDash width={30} />
      <div className={styles.list}>
        {props.rate.map((rate, index) => {
          return (
            <div key={index} className={styles.rateContainer}>
              {rate.name}
              <div className={styles.rate}>{rate.percent}%</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ArticlesCard = props => {
  const eventCategory = `${props.sectionHeaderText.toLowerCase()}-module`
  const { articles } = props

  return (
    <div data-testid="articles-card" className={props.className}>
      <div className={styles.titleContainer}>
        <h4 data-testid="header" className={styles.title}>
          {props.sectionHeaderText}
        </h4>
        <Link
          data-testid="see-all-link"
          to={`/article?${queryString.stringify({
            articleCategory: props.articleCategory,
            program: props.articleProgram
          })}`}
          className={styles.seeAll}
        >
          See all
        </Link>
      </div>
      <DecorativeDash width={30} />
      <div className={styles.list}>
        {articles && articles.items.length ? (
          <div>
            {articles.items.map((article, index) => {
              const linkTitle =
                /* eslint-disable-next-line no-magic-number */
                article.title.length > MAX_TITLE_LENGTH
                  ? article.title.slice(0, MAX_TITLE_LENGTH + 10) + '...'
                  : article.title

              return (
                <div key={index}>
                  <Link data-testid="article-url" to={article.url}>
                    {linkTitle}
                  </Link>
                  <div data-testid="article-date" className={styles.date}>
                    {moment.unix(article.updated).format('MMM D, YYYY')}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  )
}

QuickLinks.defaultProps = {
  data: {
    type: 'quickLinks',
    typeOfLinks: [
      {
        type: 'documentLookup',
        documentActivity: [],
        documentProgram: ['CDC/504'],
        documentType: ['SOP'],
        sectionHeaderText: 'SOPs'
      },
      {
        type: 'documentLookup',
        documentActivity: [],
        documentProgram: ['7(a)'],
        documentType: ['Information notice'],
        sectionHeaderText: 'Policy guidance'
      },
      {
        type: 'ratesList',
        rate: [
          {
            type: 'rate',
            name: 'SBA LIBOR Base Rate',
            percent: 4.08
          },
          {
            type: 'rate',
            name: 'SBA Peg Rate',
            percent: 6.08
          },
          {
            type: 'rate',
            name: 'SBA FIXED Base Rate',
            percent: 2.625
          }
        ],
        sectionHeaderText: 'Rates'
      },
      {
        type: 'articleLookup',
        articleProgram: null,
        sectionHeaderText: 'Articles'
      }
    ]
  }
}

QuickLinks.propTypes = {
  data: PropTypes.shape({
    typeOfLinks: PropTypes.arrayOf(
      PropTypes.shape({
        articleCategory: PropTypes.arrayOf(PropTypes.string),
        articleProgram: PropTypes.arrayOf(PropTypes.string),
        documentActivity: PropTypes.arrayOf(PropTypes.string),
        documentProgram: PropTypes.arrayOf(PropTypes.string),
        documentType: PropTypes.arrayOf(PropTypes.string),
        sectionHeaderText: PropTypes.string,
        type: PropTypes.oneOf(['articleLookup', 'documentLookup', 'ratesList'])
      })
    )
  })
}

export { QuickLinks }

export default QuickLinks
