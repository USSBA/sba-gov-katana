import React, { Fragment } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import queryString from 'querystring'
import PropTypes from 'prop-types'
import { chunk, includes, isEmpty, last } from 'lodash'

import style from './document-article.scss'
import { Button, ContactText, DecorativeDash, FileTypeIcon, Label, Link, TextSection } from 'atoms'
import { logPageEvent } from '../../../services/analytics.js'
import { getCurrentFile } from '../../../services/utils.js'
import { fetchRestContent } from '../../../../client/fetch-content-helper'

export class DocumentArticle extends React.Component {
  constructor() {
    super()
    this.state = {
      officeData: null
    }
  }

  async componentDidMount() {
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

  downloadClick(currentFile) {
    if (currentFile && currentFile.fileUrl) {
      logPageEvent({ category: 'Download-PDF-CTA', action: 'Click' })
      window.open(currentFile.fileUrl, '_blank')
    }
  }

  handleRelatedPrograms(program) {
    const {
      data: { type }
    } = this.props
    const params = { program: program }

    window.open('/' + type + '/?' + queryString.stringify(params), '_self')
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
    if (officeData && !isEmpty(officeData.title) && !isEmpty(officeData.url)) {
      title = officeData.title
      url = officeData.url
    } else if (
      !isEmpty(data.officeLink) &&
      !isEmpty(data.officeLink.title) &&
      !isEmpty(data.officeLink.url)
    ) {
      title = data.officeLink.title
      url = data.officeLink.url
    }

    if (title && url) {
      officeElement = (
        <span data-testid="office link">
          By <Link to={url}>{title}</Link>
        </span>
      )
    }

    return officeElement
  }

  renderContactInfo() {
    const {
      data: { mediaContacts }
    } = this.props
    const { officeData } = this.state
    const contactTextProps = {}

    if (!isEmpty(mediaContacts)) {
      contactTextProps.articleContacts = mediaContacts
    }
    if (!isEmpty(officeData) && typeof officeData.mediaContact === 'number') {
      contactTextProps.officeContact = officeData.mediaContact
    }

    if (!isEmpty(contactTextProps)) {
      return <ContactText {...contactTextProps} />
    }
  }

  // checks if file is in the directory for noncompliant files
  isNot508Compliant(currentFile) {
    const nonCompliantDirectoryPattern = /^\/sites\/default\/files\/sba\/.*\.[a-z]+/i
    return currentFile && currentFile.fileUrl && nonCompliantDirectoryPattern.test(currentFile.fileUrl)
  }

  render() {
    const { data } = this.props

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

      const { translatedDocList } = data
      const showDownload = !(data.removeDownloadButton && data.removeDownloadButton === true)
      //explicit because data.removeDownloadButton can be false or {}

      return (
        <div data-testid="document-article" className={'document-article ' + style.page}>
          <Label {...labelProps} />
          <h1 className={titleClassName}>{data.title}</h1>
          {!isEmpty(data.subtitle) && <p>{data.subtitle}</p>}
          {this.isNot508Compliant(currentFile) && <Noncompliant508Message />}
          {includes(data.category, PRESS_RELEASE) && (
            <h5>
              {moment.unix(data.created).format('MMMM D, YYYY')}
              {articleIdText}
            </h5>
          )}
          {!isEmpty(translatedDocList) && (
            <Fragment>
              <TextSection className={style.body} text={body} />
              <TranslatedDocuments defaultDoc={data.files[0]} docList={translatedDocList} />
            </Fragment>
          )}
          {isEmpty(translatedDocList) && (
            <Fragment>
              {!isEmpty(currentFile) && <div>{this.renderDateLine(currentFile)}</div>}
              <div data-testid="office and contact info" className={style.meta}>
                {this.renderOfficeInfo()}
                <br />
                {pageType === 'article' && this.renderContactInfo()}
              </div>
              <hr className={style.hr} />
              <div className={style.summaryContainer}>
                <div className="column">
                  {showDownload && currentFile && !isEmpty(currentFile.fileUrl) && (
                    <div data-testid="download-button">
                      <Button fullWidth onClick={e => this.downloadClick(currentFile)} primary>
                        {`Download ${currentFileExtension}`}
                      </Button>
                    </div>
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
              <div
                className={'document-article-related-programs-container ' + style.relatedProgramsContainer}
              >
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
            </Fragment>
          )}
        </div>
      )
    } else {
      return <div>Document Not Found</div>
    }
  }
}

const Noncompliant508Message = () => {
  const supportEmail = 'support@us-sba.atlassian.net'
  const supportEmailSubjectLine = 'Document Assistance'
  const supportUrl = `mailto:${supportEmail}?subject=${supportEmailSubjectLine}`
  return (
    <div className={style.noncompliant} data-testid="not-compliant-message">
      This document is presented for historical/archival purposes. For questions or assistance with this
      document, please contact <Link to={supportUrl}>{supportEmail}</Link>
    </div>
  )
}
const TranslatedDocuments = ({ docList, defaultDoc }) => {
  const notices = [
    {
      language: 'spanish',
      prefix: 'Español',
      text:
        'Las solicitudes deben presentarse en inglés. Todos los siguientes documentos se ofrecen solo con fines informativos y como referencia para usted.'
    },
    {
      language: 'vietnamese',
      prefix: 'Tiếng Việt',
      text:
        'Các đơn đăng ký phải được nộp bằng tiếng Anh. Tất cả các tài liệu dưới đây chỉ phục vụ mục đích cung cấp thông tin.'
    },
    {
      language: 'korean',
      prefix: '한국어',
      text: '신청서는 드시 영어로 제출해야 합니다. 아래 문서는 모두 정보 제공 목적으로만 제공됩니다.'
    },
    {
      language: 'chinese',
      prefix: {
        simplified: '中文简体',
        traditional: '中文繁軆'
      },
      text: {
        simplified: '您必须以英文提交申请。 以下提供的所有文件仅供参考。',
        traditional: '您必須以英文提交申請。 以下提供的所有文檔僅供參考。'
      }
    },
    {
      language: 'japanese',
      prefix: '日本語',
      text: '申請は英語で行う必要があります。以下の文書は全て情報提供のみを目的とします。'
    },
    {
      language: 'russian',
      prefix: 'русский язык',
      text:
        'Заявки должны подаваться на английском языке. Все представленные ниже документы предназначены только для ознакомительных целей.'
    },
    {
      language: 'arabic',
      text: ' يجب تقديم الطلبات باللغة الإنجليزية.\nجميع المستندات المقدمة أدناه هي لأغراض إعلامية فقط.'
    },
    {
      language: 'french',
      prefix: 'Français',
      text:
        'Les demandes doivent être présentées en anglais.  Tous les documents fournis ci-dessous le sont à titre informatif uniquement.'
    },
    {
      language: 'portugues',
      prefix: 'Português',
      text:
        'As inscrições devem obrigatoriamente ser enviadas em inglês.  Os documentos abaixo são disponibilizados somente para fins informativos.'
    },
    {
      language: 'tagalog',
      prefix: 'Tagalog',
      text:
        'Dapat isumite sa Ingles ang mga aplikasyon. Ang lahat ng mga dokumento na ibinigay sa ibaba ay para sa mga layuning pang-impormasyon lamang.'
    },
    {
      language: 'hatian creole',
      prefix: 'Kreyòl Ayisyen',
      text:
        'Aplikasyon yo dwe depoze nan lang anglè. Tout dokiman ki disponib pi ba la yo se pou enfòmasyon w sèlman.'
    },
    {
      language: 'german',
      prefix: 'Deutsche',
      text:
        'Müssen die Anträge in Englisch ausgefüllt und eingereicht werden.  Alle unten zur Verfügung gestellte Dokumente dienen rein informativen Zwecken.'
    },
    {
      language: 'hindi',
      prefix: 'हिन्दी भाषा',
      text:
        'आवेदन अंग्रेजी में प्रस्तुत किए जाने चाहिए। नीचे दिए गए सभी दस्तावेज़ केवल सूचना के उद्देश्यों के लिए हैं।'
    },
    {
      language: 'italian',
      prefix: 'Italiano',
      text:
        'Le richieste devono essere presentate in inglese.  Tutti i documenti forniti in seguito hanno unicamente scopi informativi.'
    },
    {
      language: 'polish',
      prefix: 'Polski',
      text:
        'Wnioski należy składać w języku angielskim. Wszystkie przedstawione poniżej dokumenty mają charakter wyłącznie informacyjny.'
    },
    {
      language: 'gujarati',
      prefix: 'ગુજરાતી',
      text:
        'અરજીઓને અંગ્રેજીમાં રજૂ કરવી આવશ્યક છે.  નીચે આપેલા તમામ દસ્તાવેજો માત્ર માહિતીના હેતુ માટે છે.'
    }
  ]
  const languageList = docList
    .map(listItem => {
      let result = null
      if (!isEmpty(listItem.language)) {
        const language = listItem.language[0].toLowerCase()
        const item = Object.assign({}, listItem)
        notices.find(notice => {
          const bool = language.includes(notice.language)
          if (bool) {
            if (language.includes('chinese') && language.includes('simplified')) {
              item.notice = notice.text.simplified
              item.prefix = notice.prefix.simplified
            } else if (language.includes('chinese') && language.includes('traditional')) {
              item.notice = notice.text.traditional
              item.prefix = notice.prefix.traditional
            } else {
              item.notice = notice.text
              if (!isEmpty(notice.prefix)) {
                item.prefix = notice.prefix
              }
            }
          }
          return bool
        })
        result = item
      }
      return result
    })
    .filter(item => item !== null)
  return (
    <Fragment>
      <h3>Your application must be submitted in English.</h3>
      <p>
        <em>All documents below are for your reference only.</em>
      </p>
      <div className={style.officialSubmissionMessage}>
        <p>
          <strong>English - for official submission</strong> <strong>|</strong>{' '}
          <a href={defaultDoc.fileUrl} target="_blank">
            Download pdf <FileTypeIcon fileExtension="pdf" />
          </a>
        </p>
      </div>
      <hr />
      <div className={style.languages}>
        <h3>Languages</h3>
        {chunk(languageList, 4).map((list, i) => (
          <ul key={i}>
            {list.map((item, j) => (
              <li key={j}>
                <a href={`#${item.language[0].replace(' ', '-').toLowerCase()}`}>{item.language[0]}</a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className={style.list}>
        <h4>Translated Documents</h4>
        <ul>
          {languageList.map((item, i) => (
            <li
              key={i}
              className={style.button}
              role="button"
              tabIndex="0"
              onClick={() => {
                window.open(item.translatedDocFile.url, '_blank')
              }}
            >
              <p id={item.language[0].replace(' ', '-').toLowerCase()}>
                {!isEmpty(item.prefix) && <strong>{item.prefix} | </strong>}
                <strong>{item.language}</strong>
              </p>
              <div className={style.colA}>
                <p>
                  <em>{item.translatedDocFile.description}</em>
                </p>
                <p className={style.notice}>{item.notice}</p>
              </div>
              <div className={style.colB}>
                <a className={style.link} href={item.translatedDocFile.url} target="_blank">
                  <strong>Download pdf</strong> <FileTypeIcon fileExtension="pdf" />
                </a>
              </div>
              <div className={style.clear} />
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  )
}
DocumentArticle.propTypes = {
  data: PropTypes.object.isRequired
}
export default DocumentArticle
