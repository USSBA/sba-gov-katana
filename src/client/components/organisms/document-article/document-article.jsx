import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import queryString from 'querystring'
import { includes, isEmpty, last } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import clientConfig from '../../../services/client-config.js'
import style from './document-article.scss'
import * as ContentActions from '../../../actions/content.js'
import * as NavigationActions from '../../../actions/navigation.js'
import { Button, DecorativeDash, Label, Link, TextSection } from 'atoms'
import { logPageEvent } from '../../../services/analytics.js'
import { getCurrentFile } from '../../../services/utils.js'

export class DocumentArticle extends React.Component {
  componentDidMount() {
    const {
      contentActions: { fetchContentIfNeeded }
    } = this.props

    fetchContentIfNeeded('officesRaw', 'officesRaw')
    fetchContentIfNeeded('persons', 'persons')
  }

  downloadClick(currentFile) {
    if (currentFile && currentFile.fileUrl) {
      logPageEvent({ category: 'Download-PDF-CTA', action: 'Click' })
      window.open(currentFile.fileUrl, '_blank')
    }
  }

  handleRelatedPrograms(program) {
    const { navigationActions, type } = this.props
    const params = { program: program }

    navigationActions.locationChange('/' + type + '/?' + queryString.stringify(params))
  }

  renderDateLine(file) {
    const { effectiveDate, updated } = file
    const { data } = this.props

    const dateFormat = 'MMM D, YYYY'
    const dates = []

    if (effectiveDate) {
      dates.push({
        title: 'Effective',
        date: moment(effectiveDate).format(dateFormat)
      })
    }

    if (updated) {
      dates.push({
        title: 'Last Updated',
        date: moment.unix(updated).format(dateFormat)
      })
    }

    const dateLine = dates.map((object, index) => {
      return (
        <div key={index}>
          {index > 0 && <span className={style.dateSeperator}> | </span>}
          <h5 className={style.date}>
            {object.title} {object.date}
          </h5>
        </div>
      )
    })

    return <div className={style.dates}> {dateLine} </div>
  }

  render() {
    const { data, mediaContact, office, officeLink } = this.props

    const body = data.body && typeof data.body === 'string' ? data.body : ''

    if (data) {
      const { category, type: pageType } = data
      const currentFile = getCurrentFile(data.files, data.file)

      let currentFileExtension = ''
      if (
        currentFile &&
        currentFile.fileUrl &&
        currentFile.fileUrl.includes &&
        currentFile.fileUrl.includes('.')
      ) {
        currentFileExtension = '.' + last(currentFile.fileUrl.split('.'))
      }

      let type
      if (pageType === 'document') {
        type = data.documentIdType
      } else if (pageType === 'article' && category) {
        type = category[0]
      }

      const PRESS_RELEASE = 'Press release'
      const MEDIA_ADVISORY = 'Media advisory'

      let articleIdText = null
      if (data.articleId && typeof data.articleId === 'string') {
        let articleIdPrefix
        if (category) {
          if (type === PRESS_RELEASE) {
            articleIdPrefix = 'Release'
          } else if (type === MEDIA_ADVISORY) {
            articleIdPrefix = 'Advisory'
          }
        }
        articleIdText = ` | ${articleIdPrefix && `${articleIdPrefix} Number `}${data.articleId}`
      }

      let officeData = {}
      if (clientConfig.pressRelease && !isEmpty(office) && office.website) {
        const {
          title,
          website: { url }
        } = office
        officeData = { title, url }
      } else if (!clientConfig.pressRelease && !isEmpty(officeLink) && officeLink.url) {
        const { title, url } = officeLink
        officeData = { title, url }
      }

      let officeElement = null
      if (!isEmpty(officeData)) {
        const { title, url } = officeData
        officeElement = (
          <span>
            By <Link to={url}>{title}</Link>
          </span>
        )
      }

      let contactElement = null
      if (pageType === 'article' && mediaContact) {
        const { emailAddress, phone } = mediaContact
        let emailAddressLink
        let phoneLink

        if (!isEmpty(emailAddress)) {
          emailAddressLink = <Link to={`mailto:${emailAddress}`}>{emailAddress}</Link>
        }

        if (!isEmpty(phone)) {
          phoneLink = <Link to={`tel:${phone}`}>{phone}</Link>
        }

        if (emailAddressLink && phoneLink) {
          contactElement = (
            <span>
              Contact {emailAddressLink} or {phoneLink}
            </span>
          )
        } else if (emailAddressLink) {
          contactElement = <span>Contact {emailAddressLink}</span>
        } else if (phoneLink) {
          contactElement = <span>Contact {phoneLink}</span>
        }
      }

      const titleClassName = classNames({
        'document-article-title': true,
        [style.title]: true,
        [style.titleMarginBottom]: type
      })

      return (
        <div className={'document-article ' + style.page}>
          <Label type={type} id={!isEmpty(data.documentIdNumber) && data.documentIdNumber} />
          <h1 className={titleClassName}>{data.title}</h1>
          {includes(data.category, PRESS_RELEASE) && (
            <h5>
              Last updated {moment.unix(data.updated).format('MMMM D, YYYY')}
              {articleIdText}
            </h5>
          )}

          {!isEmpty(currentFile) && <div>{this.renderDateLine(currentFile)}</div>}

          {!isEmpty(officeData) && (
            <p className={style.meta}>
              {officeElement}
              <br />
              {contactElement}
            </p>
          )}

          <hr className={style.hr} />
          <div className={style.summaryContainer}>
            <div className="column">
              {currentFile && !isEmpty(currentFile.fileUrl) && (
                <Button fullWidth onClick={e => this.downloadClick(currentFile)} primary>
                  {`Download ${currentFileExtension}`}
                </Button>
              )}
            </div>
            <div className="column">
              {!isEmpty(data.summary) && <h5 className={style.summary}>{data.summary}</h5>}
            </div>
          </div>
          <div className={style.dash}>
            <DecorativeDash width={77} />
          </div>
          {/* TODO: body style for grid media queries should be baked into text section? */}
          <TextSection className={style.body} text={body} />
          <div className={'document-article-related-programs-container ' + style.relatedProgramsContainer}>
            <hr />
            <span className={style.relatedPrograms}>Related programs: </span>
            {data.programs.map((program, index) => {
              return (
                <span className="document-article-related-programs-link" key={index}>
                  <Link
                    onClick={() => {
                      return this.handleRelatedPrograms(program)
                    }}
                  >
                    {program}
                  </Link>
                  {index === data.programs.length - 1 ? null : ', '}
                </span>
              )
            })}
            <hr className={style.hr} />
          </div>
        </div>
      )
    } else {
      return <div>Document Not Found</div>
    }
  }
}

function mapStateToProps(state, ownProps) {
  const {
    contentReducer: { officesRaw: offices, persons }
  } = state
  const {
    data: { office: officeId, mediaContact: mediaContactId }
  } = ownProps

  let office
  let mediaContact

  if (offices && typeof officeId === 'number') {
    office = offices.find(({ id }) => id === officeId)
  }

  if (persons && typeof mediaContactId === 'number') {
    mediaContact = persons.find(({ id }) => id === mediaContactId)
  } else if (persons && office && typeof office.mediaContact === 'number') {
    mediaContact = persons.find(({ id }) => id === office.mediaContact)
  }

  return {
    office,
    mediaContact
  }
}

function mapDispatchToProps(dispatch) {
  return {
    contentActions: bindActionCreators(ContentActions, dispatch),
    navigationActions: bindActionCreators(NavigationActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentArticle)
