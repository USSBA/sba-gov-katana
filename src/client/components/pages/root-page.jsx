import React from 'react'
import { findSection, findPageLineageByNodeId } from '../../services/menu.js'
import Page from './page.jsx'
import SectionPage from './section-page/section-page.jsx'
import ErrorPage from '../pages/error-page/error-page.jsx'
import DocumentPage from '../pages/document-page/document-page.jsx'
import ArticlePage from '../pages/article-page/article-page.jsx'
import BlogPage from '../pages/blog-page/blog-page.jsx'
import BlogsLandingPage from '../pages/blogs-landing/blogs-landing.jsx'
import StandalonePage from '../templates/standalone-page/standalone-page.jsx'
import { getConfig } from '../../services/client-config.js'
import { fetchSiteContent } from '../../fetch-content-helper.js'
import { getLanguageOverride } from '../../services/utils.js'
import DistrictOfficePage from '../pages/district-office-page/district-office-page.jsx'

export class RootPage extends React.Component {
  constructor() {
    super()
    this.state = {
      siteMap: []
    }
  }

  componentWillMount() {
    fetchSiteContent('siteMap').then(data => {
      this.setState({ siteMap: data })
    })
  }

  renderPage(first, second, third, fourth, fifth) {
    const langCode = getLanguageOverride()
    if (getConfig('responseStatus') === 404) {
      return <ErrorPage />
    } else if (first === 'document') {
      return <DocumentPage id={window.nodeId} />
    } else if (first === 'article') {
      return <ArticlePage location={this.props.location} id={window.nodeId} />
    } else if (first === 'blog') {
      return <BlogPage id={window.nodeId} />
    } else if (first === 'page') {
      return <StandalonePage id={window.nodeId} />
    } else if (window && window.nodeId && this.state.siteMap.length && Number(window.nodeId) > 0) {
      const pageLineage = findPageLineageByNodeId(this.state.siteMap, window.nodeId)
      if (pageLineage) {
        return <Page lineage={pageLineage} nodeId={window.nodeId} />
      } else {
        return <ErrorPage />
      }
    } else if (first && !second && !third && !fourth && !fifth) {
      const sectionData = findSection(this.state.siteMap, first, langCode)
      if (sectionData) {
        return <SectionPage sectionData={sectionData} />
      }
    }

    return <div />
  }

  render() {
    return this.renderPage(
      this.props.params.first,
      this.props.params.second,
      this.props.params.third,
      this.props.params.fourth,
      this.props.params.fifth
    )
  }
}

export default RootPage
