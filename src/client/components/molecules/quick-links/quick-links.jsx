import React, { PureComponent } from 'react'
import moment from 'moment'
import queryString from 'querystring'
import { chain, isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import s from './quick-links.scss'
import * as ContentActions from '../../../actions/content.js'
import * as NavigationActions from '../../../actions/navigation.js'
import { DecorativeDash, Link } from 'atoms'

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

class QuickLinks extends PureComponent {
  componentWillMount() {
    this.fetchDocuments()
    this.fetchArticles()
  }

  fetchDocuments() {
    this.props.data.typeOfLinks.map((quickLink, index) => {
      if (quickLink.type === 'documentLookup') {
        this.props.actions.fetchContentIfNeeded('documents-' + index, 'documents', {
          sortBy: 'Last Updated',
          type: isEmpty(quickLink.documentType[0]) ? 'all' : quickLink.documentType[0],
          program: isEmpty(quickLink.documentProgram[0]) ? 'all' : quickLink.documentProgram[0],
          activity: isEmpty(quickLink.documentActivity[0]) ? 'all' : quickLink.documentActivity[0],
          start: 0,
          end: 3
        })
      }
    })
  }

  fetchArticles() {
    this.props.data.typeOfLinks.map((quickLink, index) => {
      if (quickLink.type === 'articleLookup') {
        this.props.actions.fetchContentIfNeeded('articles-' + index, 'articles', {
          sortBy: 'Last Updated',
          articleCategory: isEmpty(quickLink.articleCategory[0]) ? 'all' : quickLink.articleCategory[0],
          program: isEmpty(quickLink.articleProgram[0]) ? 'all' : quickLink.articleProgram[0],
          start: 0,
          end: 3
        })
      }
    })
  }

  generateGrid(length) {
    let gridClass = { 1: s.oneCard, 2: s.twoCards }
    return length > 2 ? s.manyCards : gridClass[length]
  }

  renderQuickLinks() {
    let gridClass = this.generateGrid(this.props.data.typeOfLinks.length)
    return this.props.data.typeOfLinks.map((quickLink, index) => {
      if (quickLink.type === 'documentLookup') {
        return (
          <LatestDocumentsCard
            key={index}
            classname={s.card + ' ' + gridClass}
            documents={this.props['documents-' + index]}
            {...quickLink}
            locationChange={this.props.navigation.locationChange}
          />
        )
      } else if (quickLink.type === 'ratesList') {
        return <RatesCard key={index} {...quickLink} classname={s.card + ' ' + gridClass} />
      } else if (quickLink.type === 'articleLookup') {
        return (
          <ArticlesCard
            key={index}
            classname={s.card + ' ' + gridClass}
            articles={this.props['articles-' + index]}
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

function mapReduxStateToProps(reduxState, ownProps) {
  const documentsAndArticles = {}

  Object.keys(reduxState.contentReducer).forEach(key => {
    if (key.includes('documents-') || key.includes('articles-')) {
      documentsAndArticles[key] = reduxState.contentReducer[key]
    }
  })
  return documentsAndArticles
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch),
    navigation: bindActionCreators(NavigationActions, dispatch)
  }
}

export { QuickLinks }

export default connect(mapReduxStateToProps, mapDispatchToProps)(QuickLinks)
