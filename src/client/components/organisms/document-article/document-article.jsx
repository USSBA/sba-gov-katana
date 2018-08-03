import React from 'react'
import moment from 'moment'
import queryString from 'querystring'
import { isEmpty, last } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import s from './document-article.scss'
import * as NavigationActions from '../../../actions/navigation.js'
import { Button, DecorativeDash, Label, Link, TextSection } from 'atoms'
import { logPageEvent } from '../../../services/analytics.js'
import { getCurrentFile } from '../../../services/utils.js'

export class DocumentArticle extends React.Component {
  downloadClick(currentFile) {
    if (currentFile && currentFile.fileUrl) {
      logPageEvent({ category: 'Download-PDF-CTA', action: 'Click' })
      window.open(currentFile.fileUrl, '_blank')
    }
  }

  formatDate(date) {
    return moment(date).format('MMM D, YYYY')
  }

  handleRelatedPrograms(program) {
    logPageEvent({ category: 'Related-Programs', action: `program${program}` })
    const params = { program: program }
    this.props.actions.locationChange('/' + this.props.type + '/?' + queryString.stringify(params))
  }

  renderDateLine(file) {
    const { effectiveDate, updated } = file
    const { data } = this.props

    const dates = []

    if (effectiveDate) {
      dates.push({
        title: 'Effective',
        date: this.formatDate(effectiveDate)
      })
    }

    if (updated) {
      dates.push({
        title: 'Last Updated',
        date: moment.unix(updated).format('MMM D, YYYY')
      })
    }

    const dateLine = dates.map((object, index) => {
      return (
        <div key={index}>
          {index > 0 && <span className={s.dateSeperator}> | </span>}
          <h5 className={s.date}>
            {object.title} {object.date}
          </h5>
        </div>
      )
    })

    return <div className={s.dates}> {dateLine} </div>
  }

  render() {
    const data = this.props.data
    const body = data.body && typeof data.body === 'string' ? data.body : ''
    if (data) {
      const currentFile = getCurrentFile(this.props.data.files, this.props.data.file)
      let currentFileExtension = ''
      if (
        currentFile &&
        currentFile.fileUrl &&
        currentFile.fileUrl.includes &&
        currentFile.fileUrl.includes('.')
      ) {
        currentFileExtension = '.' + last(currentFile.fileUrl.split('.'))
      }
      let documentTypeString = null
      switch (data.type) {
        case 'document':
          documentTypeString = data.documentIdType
          break
        default:
          documentTypeString = null
          break
      }

      return (
        <div className={'document-article ' + s.page}>
          <Label
            type={documentTypeString || undefined}
            id={!isEmpty(data.documentIdNumber) && data.documentIdNumber}
          />
          <h1
            className={
              'document-article-title ' + s.title + ' ' + (documentTypeString ? s.titleMarginBottom : '')
            }
          >
            {data.title}
          </h1>

          {!isEmpty(currentFile) && <div>{this.renderDateLine(currentFile)}</div>}

          {data.officeLink.url ? (
            <div className={s.office}>
              By <Link to={data.officeLink.url}>{data.officeLink.title}</Link>
            </div>
          ) : (
            <span />
          )}
          <hr className={s.hr} />
          <div className={s.summaryContainer}>
            <div className="column">
              <Button
                className="document-article-pdf-download-btn"
                disabled={!currentFile || isEmpty(currentFile.fileUrl)}
                fullWidth
                onClick={e => this.downloadClick(currentFile)}
                primary
              >
                {`Download ${currentFileExtension}`}
              </Button>
            </div>
            <div className="column">
              <h5 className={s.summary}>{data.summary}</h5>
            </div>
          </div>
          <div className={s.dash}>
            <DecorativeDash width={4.278} />
          </div>
          {/* TODO: body style for grid media queries should be baked into text section? */}
          <TextSection className={s.body} text={body} />
          <div className={'document-article-related-programs-container ' + s.relatedProgramsContainer}>
            <hr />
            <span className={s.relatedPrograms}>Related programs: </span>
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
                  {index == data.programs.length - 1 ? null : ', '}
                </span>
              )
            })}
            <hr className={s.hr} />
          </div>
        </div>
      )
    } else {
      return <div>Document Not Found</div>
    }
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(NavigationActions, dispatch) }
}

export default connect(
  null,
  mapDispatchToProps
)(DocumentArticle)
