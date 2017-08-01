import React from 'react'
import s from './document-page.scss'

import localDocuments from "../../../../models/dao/documents.js";

import DocumentArticle from '../../molecules/document-article/document-article.jsx'

class DocumentPage extends React.Component {

  render() {
    console.log(localDocuments)
     return (
     	<div>
     		{this.props.fakeData ? (
     			<DocumentArticle data={this.props.fakeData}/>
     			) : (
     			<div>LOADING DOCUMENT DATA</div>
     			)
     		}
     	</div>
     );
	}
}

DocumentPage.defaultProps = {
  fakeData: localDocuments[0]
}

export default DocumentPage 