import React from 'react'
import { shallow } from 'enzyme'
import DocumentArticleTemplate from 'templates/document-article/document-article.jsx'
import { VersionsList } from 'atoms'
import { DocumentArticle } from 'organisms'

describe('DocumentArticleTemplate', () => {
  test('should render an article when article data is given', () => {
    const props = {
      article: {
        body: '',
        relatedDocuments: []
      }
    }
    const component = shallow(<DocumentArticleTemplate {...props} />)
    const result = component.find(DocumentArticle).length
    const expected = 1
    expect(result).toEqual(expected)
  })
  test('should render a document when document data is given', () => {
    const props = {
      document: {
        body: '',
        relatedDocuments: []
      }
    }
    const component = shallow(<DocumentArticleTemplate {...props} />)
    const result = component.find(DocumentArticle).length
    const expected = 1
    expect(result).toEqual(expected)
  })
})
