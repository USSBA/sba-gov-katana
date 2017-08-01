import React from 'react'
import s from './document-page.scss'

import fakeDocumentData from './fake-document-data.js'

import DocumentArticle from '../../molecules/document-article/document-article.jsx'

class DocumentPage extends React.Component {

  render() {
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
  fakeData: fakeDocumentData[0]
}

export default DocumentPage 