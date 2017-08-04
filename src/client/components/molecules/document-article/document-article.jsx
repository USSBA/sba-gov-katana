import React from 'react'
import s from './document-article.scss'

import DocumentType from '../../atoms/document-type/document-type.jsx'
import TextSection from '../text-section/text-section.jsx'
import DecorativeDash from '../../atoms/decorative-dash/decorative-dash.jsx'
import Button from '../../atoms/large-primary-button/large-primary-button.jsx'
import moment from 'moment'

class DocumentArticle extends React.Component {

  getNewestFile() {
    return this.props.data.files
      ? this.props.data.files.reduce((acc, file) => {
        return file.version > acc.version
          ? file
          : acc
      })
      : {};
  }

  downloadClick(e) {
    window.open(this.state.newestFile.url, '_blank')
  }

  formatDate(date) {
    return moment(date).format('MMM D, YYYY')
  }

  render() {
    const data = this.props.data

    const previousVersionsMockData = [{
        'version': 'Version 2',
        'date': 'Oct 17, 2015',
        'url': '#'
      }, {
        'version': 'Version 1',
        'date': 'Oct 24, 2014',
        'url': '#'
      }]

      const previousVersionsList = previousVersionsMockData.map(o => {
        return (
            <li><strong>{o.version}</strong> <strong>|</strong> Effective: {o.date}. <a href={o.url}>Download PDF <i className="fa fa-file-pdf-o" aria-hidden="true" /></a></li>
          )
      })

    if (data) {
      const newestFile = this.getNewestFile()
      return (
        <div className={"document-article " + s.page}>
          <DocumentType type={data.documentIdType} number={data.documentIdNumber}/>
          <h1 className={"document-article-title " + s.title}>{data.title}</h1>
          <p className={s.dates}>Expiration {this.formatDate(newestFile.expirationDate)}
            <span>|</span>
            Effective {this.formatDate(newestFile.effectiveDate)}</p>
          <div className={s.office}>By{" "}
            <a href={data.officeLink.url}>{data.officeLink.title}</a>
          </div>
          <hr className={s.hr}/>
          <div className={s.summaryContainer}>
            <Button className={"document-article-pdf-download-btn " + s.downloadButton} onClick={(e) => this.downloadClick(e)} text="download pdf"/>
            <p className={"document-article-summary " + s.summary}>{data.summary}</p>
          </div>
          <div className={s.dashContainer}><DecorativeDash className={s.dash}/></div>
          <TextSection className={s.body} text={data.body}/>
          <div className={"document-article-related-programs-container " + s.relatedProgramsContainer}>
            <hr className={s.hr}/>
            <span className={s.relatedPrograms}>Related programs:{" "}
            </span>
            
            {data.programs.map((program, index) => {
              return <span className="document-article-related-programs-link" key={index}>
                <a>{program}</a>{index == data.programs.length - 1
                  ? null
                  : ", "}</span>
            })}

            <hr className={s.hr}/>

            <div className={s.previousVersionsList}>
              <h3>Previous versions</h3>
              <ul>
                {previousVersionsList}
              </ul>
            </div>

            <hr className={s.hr}/>

          </div>
        </div>
      );
    } else {
      return (
        <div>Document Not Found</div>
      );
    }
  }
}

export default DocumentArticle
