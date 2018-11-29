import React, { PureComponent } from 'react'
import moment from 'moment'
import queryString from 'querystring'
import { chain, isEmpty } from 'lodash'
import { DecorativeDash, Link } from 'atoms'
import s from './quick-links.scss'
import { fetchSiteContent } from '../../../fetch-content-helper'

function getCurrentFile(files) {
  let found = null

  if (files) {
    found = chain(files)
      .filter(item => moment(item.effectiveDate).isSameOrBefore(moment()))
      .sortBy('effectiveDate')
      .last()
      .value()
  }

  return found
}

function formatDate(date) {
  return moment(date).format('MMM D, YYYY')
}

const valueOrAll = value => (isEmpty(value[0]) ? 'all' : value[0])

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
    let gridClass = { 1: s.oneCard, 2: s.twoCards }
    return length > 2 ? s.manyCards : gridClass[length]
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
            classname={s.card + ' ' + gridClass}
            documents={documents['documents-' + index]}
            {...quickLink}
          />
        )
      } else if (quickLink.type === 'ratesList') {
        return <RatesCard key={index} {...quickLink} classname={s.card + ' ' + gridClass} />
      } else if (quickLink.type === 'articleLookup') {
        return (
          <ArticlesCard
            key={index}
            classname={s.card + ' ' + gridClass}
            articles={articles['articles-' + index]}
            {...quickLink}
          />
        )
      }
    })
  }

  render() {
    return (
      <div className={s.collection}>{this.props.data ? this.renderQuickLinks() : <div>loading</div>}</div>
    )
  }
}

const LatestDocumentsCard = props => {
  const eventCategory = `${props.sectionHeaderText.toLowerCase()}-module`

  return (
    <div className={props.classname}>
      <div className={s.titleContainer}>
        <h4 className={s.title}>{props.sectionHeaderText}</h4>
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
            if (currentFile !== undefined && currentFile.effectiveDate !== undefined) {
              effectiveDate = currentFile.effectiveDate
            }

            // Add a prefix to SOPs with the format {DOC_TYPE} {DOC_NUMBER} ({DOC_VERSION}) - {DOC_TITLE}
            let titlePrefix = ''
            if (doc.documentIdType === 'SOP' && !isEmpty(doc.documentIdNumber)) {
              titlePrefix = doc.documentIdType + ' ' + doc.documentIdNumber + ' - '
            }
            const linkTitle =
              titlePrefix + (doc.title.length > 80 ? doc.title.slice(0, 90) + '...' : doc.title)
            return (
              <div key={index}>
                <Link to={doc.url}>{linkTitle}</Link>

                {effectiveDate && <div className={s.date}>{formatDate(effectiveDate)}</div>}
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
      <h4 className={s.title}>Rates</h4>
      <DecorativeDash width={1.667} />
      {props.rate.map((rate, index) => {
        return (
          <div key={index} className={s.rateContainer}>
            {rate.name}
            <div className={s.rate}>{rate.percent}%</div>
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
      <div className={s.titleContainer}>
        <h4 className={s.title}>{props.sectionHeaderText}</h4>
        <Link
          to={`/article?${queryString.stringify({
            articleCategory: props.articleCategory,
            program: props.articleProgram
          })}`}
          className={s.seeAll}
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
                article.title.length > 80 ? article.title.slice(0, 90) + '...' : article.title

              return (
                <div key={index}>
                  <Link to={article.url}>{linkTitle}</Link>
                  <div className={s.date}>{moment.unix(article.updated).format('MMM D, YYYY')}</div>
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

export { QuickLinks }

export default QuickLinks
