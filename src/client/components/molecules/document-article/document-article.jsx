import React from 'react'
import s from './document-article.scss'

import DocumentType from '../../atoms/document-type/document-type.jsx'
import TextSection from '../text-section/text-section.jsx'
import DecorativeDash from '../../atoms/decorative-dash/decorative-dash.jsx'
import Button from '../../atoms/large-primary-button/large-primary-button.jsx'

class DocumentArticle extends React.Component {
	constructor(){
		super()
		this.state = {
			newestFile: null
		}
	}

	componentWillMount(){
		this.setState({newestFile: this.getNewestFile()})
	}

	getNewestFile(){
		return this.props.data.files.reduce((acc, file) => {
			return file.version > acc.version ? file : acc
		})
	}

	downloadClick(e){
		window.open(this.state.newestFile.url, '_blank')
	}

	render

  render() {
  	const data = this.props.data
  	const newestFile = this.state.newestFile
     return (
     	<div className={s.page}>
     		<DocumentType type={data.docType} number={data.docNumber}/>
     		<h1 className={s.title}>{data.title}</h1>
     		<p className={s.dates}>Expiration {newestFile.expirationDate} <span>|</span> Effective {newestFile.effectiveDate}</p>
     		<div className={s.office}>By <a href={data.office.uri}>{data.office.title}</a></div>
     		<hr className={s.hr}/>
     		<div className={s.summaryContainer}>
     		  <Button className={s.downloadButton} onClick={(e) => this.downloadClick(e)}text="download pdf"/>
     			<p className={s.summary}>{data.summary}</p>
     		</div>
     		<div className={s.dashContainer}><DecorativeDash className={s.dash}/></div>
     		<TextSection className={s.body} text={data.body}/>
     		<div className={s.relatedProgramsContainer}>
	     		<hr className={s.hr}/>
		     		<span className={s.relatedPrograms}>Related programs: </span>
		     		{
		     			data.programs.map((program, index) => {
		     				return <span><a>{program}</a>{index == data.programs.length-1 ? null : ", "}</span>
		     			})
		     		}
	     		<hr className={s.hr}/>
     		</div>
     	</div>
     );
	}
}

export default DocumentArticle 