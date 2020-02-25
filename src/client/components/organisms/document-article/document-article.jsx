import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import queryString from 'querystring'
import PropTypes from 'prop-types'
import { includes, isEmpty, last } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import style from './document-article.scss'
import * as ContentActions from '../../../actions/content.js'
import * as NavigationActions from '../../../actions/navigation.js'
import { Button, DecorativeDash, Label, Link, TextSection } from 'atoms'
import { logPageEvent } from '../../../services/analytics.js'
import { getCurrentFile } from '../../../services/utils.js'
import { fetchRestContent } from '../../../../client/fetch-content-helper'

export class DocumentArticle extends React.Component {
  constructor() {
    super()
    this.state = {
      officeData: null,
      mediaContactsData: []
    }
  }

  componentDidMount() {
    this.getOfficeData()
    this.getMediaContactsData()
  }

  async getOfficeData() {
    const officeId = this.props.data.office
    let rawOfficeData

    if (typeof officeId === 'number') {
      rawOfficeData = await fetchRestContent(officeId)
    }
    if (rawOfficeData) {
      const officeData = {
        mediaContact: rawOfficeData.mediaContact,
        title: rawOfficeData.title,
        url: rawOfficeData.website && rawOfficeData.website.url
      }
      this.setState({ officeData })
    }
  }

  async getMediaContactsData() {
    const mediaContacts = this.props.data.mediaContacts
    const officeData = this.state.officeData
    const mediaContactsData = []

    // if it exists, use media contacts from the original (article) data
    // otherwise, if it exists, use media contact from the office
    if (!isEmpty(mediaContacts) && mediaContacts.length > 0) {
      for (let i = 0; i < mediaContacts.length; i++) {
        const mediaContact = await fetchRestContent(mediaContacts[i])
        mediaContactsData.push(mediaContact)
      }
    } else if (officeData && typeof officeData.mediaContact === 'number') {
      const mediaContact = await fetchRestContent(officeData.mediaContact)
      mediaContactsData.push(mediaContact)
    }

    if (mediaContactsData.length > 0) {
      this.setState({ mediaContactsData })
    }
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

  renderOfficeInfo() {
    const { data } = this.props
    const { officeData } = this.state
    let officeElement = null
    let title
    let url

    // if it exists, use office title and url from the office data
    // otherwise, if it exists, use title and url from the original (document) data
    if (officeData && officeData.title && officeData.url) {
      title = officeData.title
      url = officeData.url
    } else if (!isEmpty(data.officeLink) && data.officeLink.title && data.officeLink.url) {
      title = data.officeLink.title
      url = data.officeLink.url
    }

    if (title && url) {
      officeElement = (
        <span>
          By <Link to={url}>{title}</Link>
        </span>
      )
    }

    return officeElement
  }

  // Checks if a given media contact is valid to be displayed on the article page
  isValidMediaContact(mediaContact) {
    const validEmail = !isEmpty(mediaContact.emailAddress)
    const validPhone = !isEmpty(mediaContact.emailAddress)
    return validEmail || validPhone
  }

  renderContactElement() {
    const { mediaContactsData } = this.state
    const contacts = []
    for (let i = 0; i < mediaContactsData.length; i++) {
      const { name, emailAddress, phone } = mediaContactsData[i]
      let emailAddressLink
      let phoneLink

      // Appends the media contact with the correct string as needed
      if (contacts.length === 0 && this.isValidMediaContact(mediaContactsData[i])) {
        contacts.push('Contact ')
      } else if (mediaContactsData[i - 1] && this.isValidMediaContact(mediaContactsData[i - 1])) {
        contacts.push(', ')
      }

      if (!isEmpty(emailAddress)) {
        emailAddressLink = <Link to={`mailto:${emailAddress}`}>{emailAddress}</Link>
      }

      if (!isEmpty(phone)) {
        phoneLink = <Link to={`tel:${phone}`}>{phone}</Link>
      }

      if (emailAddressLink && phoneLink) {
        contacts.push(`${name} at `, emailAddressLink, ' or ', phoneLink)
      } else if (emailAddressLink) {
        contacts.push(`${name} at `, emailAddressLink)
      } else if (phoneLink) {
        contacts.push(`${name} at `, phoneLink)
      }
    }
    return contacts
  }

  render() {
    const { data } = this.props
    const { officeData } = this.state

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

      const titleClassName = classNames({
        'document-article-title': true,
        [style.title]: true,
        [style.titleMarginBottom]: type
      })

      const labelProps = {}
      if (!isEmpty(data.documentIdNumber)) {
        labelProps.id = String(data.documentIdNumber)
      }
      if (!isEmpty(type)) {
        labelProps.type = type
      }

      return (
        <div data-testid="document-article" className={'document-article ' + style.page}>
          <Label {...labelProps} />
          <h1 className={titleClassName}>{data.title}</h1>
          {!isEmpty(data.subtitle) && <p>{data.subtitle}</p>}
          {includes(data.category, PRESS_RELEASE) && (
            <h5>
              Last updated {moment.unix(data.updated).format('MMMM D, YYYY')}
              {articleIdText}
            </h5>
          )}

          {!isEmpty(currentFile) && <div>{this.renderDateLine(currentFile)}</div>}

          {!isEmpty(officeData) && (
            <p data-testid="office and contact info" className={style.meta}>
              {this.renderOfficeInfo()}
              <br />
              {pageType === 'article' && this.renderContactElement()}
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
    data: { office: officeId, mediaContacts: mediaContactIds }
  } = ownProps

  let office
  const mediaContacts = []

  if (offices && typeof officeId === 'number') {
    office = offices.find(({ id }) => id === officeId)
  }

  if (mediaContactIds) {
    mediaContactIds.length > 0 &&
      mediaContactIds.forEach(mediaContactId => {
        if (persons && typeof mediaContactId === 'number') {
          mediaContacts.push(persons.find(({ id }) => id === mediaContactId))
        }
      })
  }

  if (persons && office && mediaContacts.length === 0) {
    mediaContacts.push(persons.find(({ id }) => id === office.mediaContact))
  }

  return {
    office,
    mediaContacts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    contentActions: bindActionCreators(ContentActions, dispatch),
    navigationActions: bindActionCreators(NavigationActions, dispatch)
  }
}

DocumentArticle.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired // should be one of 'document' or 'article'
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentArticle)
