import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import queryString from 'querystring'
import { chain, isEmpty } from 'lodash'
import { DecorativeDash, Link } from 'atoms'
import style from './quick-links.scss'
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
    this.state = { article: [], documents: [] }
  }

  async componentDidMount() {
    this.setState({
      documents: await this.fetchDocuments(),
      articles: await this.fetchArticles()
    })
  }

  async fetchDocuments() {
    const results = {}
    const { typeOfLinks } = this.props.data

    for (const [index, quickLink] of typeOfLinks.entries()) {
      const { documentActivity, documentType, documentProgram, type } = quickLink

      if (type === 'documentLookup') {
        results[`documents-${index}`] = await fetchSiteContent('documents', {
          sortBy: 'Last Updated',
          type: valueOrAll(documentType),
          program: valueOrAll(documentProgram),
          activity: valueOrAll(documentActivity),
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
    const gridClass = { 1: style.oneCard, 2: style.twoCards }
    return length > 2 ? style.manyCards : gridClass[length]
  }

  renderQuickLinks() {
    const {
      data: { typeOfLinks }
    } = this.props
    const { documents, articles } = this.state
    const gridClass = this.generateGrid(typeOfLinks.length)

    return typeOfLinks.map((quickLink, index) => {
      if (quickLink.type === 'documentLookup') {
        return (
          <LatestDocumentsCard
            key={index}
            classname={style.card + ' ' + gridClass}
            documents={documents['documents-' + index]}
            {...quickLink}
          />
        )
      } else if (quickLink.type === 'ratesList') {
        return <RatesCard key={index} {...quickLink} classname={style.card + ' ' + gridClass} />
      } else if (quickLink.type === 'articleLookup') {
        return (
          <ArticlesCard
            key={index}
            classname={style.card + ' ' + gridClass}
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
      <div className={style.collection}>
        {this.props.data ? this.renderQuickLinks() : <div>loading</div>}
      </div>
    )
  }
}

const LatestDocumentsCard = props => {
  const eventCategory = `${props.sectionHeaderText.toLowerCase()}-module`

  return (
    <div className={props.classname}>
      <div className={style.titleContainer}>
        <h4 className={style.title}>{props.sectionHeaderText}</h4>
        <Link
          to={`/document?${queryString.stringify({
            type: props.documentType,
            program: props.documentProgram
          })}`}
        >
          See all
        </Link>
      </div>
      <DecorativeDash width={1.667} />
      <div>
        {props.documents && props.documents.items.length ? (
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
                <Link to={doc.url}>{linkTitle}</Link>

                {effectiveDate && <div className={style.date}>{formatDate(effectiveDate)}</div>}
              </div>
            )
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  )
}

const RatesCard = props => {
  return (
    <div className={props.classname}>
      <h4 className={style.title}>Rates</h4>
      <DecorativeDash width={1.667} />
      {props.rate.map((rate, index) => {
        return (
          <div key={index} className={style.rateContainer}>
            {rate.name}
            <div className={style.rate}>{rate.percent}%</div>
          </div>
        )
      })}
    </div>
  )
}

const ArticlesCard = props => {
  const eventCategory = `${props.sectionHeaderText.toLowerCase()}-module`
  const { articles } = props

  return (
    <div className={props.classname}>
      <div className={style.titleContainer}>
        <h4 className={style.title}>{props.sectionHeaderText}</h4>
        <Link
          to={`/article?${queryString.stringify({
            articleCategory: props.articleCategory,
            program: props.articleProgram
          })}`}
          className={style.seeAll}
        >
          See all
        </Link>
      </div>
      <DecorativeDash width={1.667} />
      <div>
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
                  <Link to={article.url}>{linkTitle}</Link>
                  <div className={style.date}>{moment.unix(article.updated).format('MMM D, YYYY')}</div>
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
