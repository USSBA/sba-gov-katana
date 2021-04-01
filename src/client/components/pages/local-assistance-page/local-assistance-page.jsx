import React from 'react'
import PropTypes from 'prop-types'
import ProgramPage from '../../templates/program-page/program-page.jsx'
import { fetchRestContent, fetchSiteContent } from '../../../fetch-content-helper.js'
import { getLanguageOverride } from '../../../services/utils.js'
import { findPageLineageByNodeId } from '../../../services/menu.js'

class LocalAssistancePage extends React.Component {
  constructor() {
    super()
    this.state = {
      siteMap: [],
      data: {}
    }
  }

  componentWillMount() {
    const langOverride = getLanguageOverride()
    const id = window.nodeId
    if (id > 0) {
      fetchRestContent(id, langOverride).then(data => {
        this.setState({ data })
      })
    }
    fetchSiteContent('siteMap').then(data => {
      this.setState({ siteMap: data })
    })
  }

  render() {
    const pageLineage = findPageLineageByNodeId(this.state.siteMap, window.nodeId)
    const { data } = this.state
    if (data && pageLineage) {
      let heroData
      if (data) {
        heroData = {
          title: data.title,
          summary: data.summary,
          buttons: data.buttons,
          bannerImage: data.bannerImage,
          zipCodeSearch: true
        }
      }
      return (
        <ProgramPage
          lineage={pageLineage}
          heroData={heroData}
          title={data.title}
          paragraphs={data.paragraphs}
        />
      )
    }
    return <div />
  }
}

LocalAssistancePage.defaultProps = {
  lineage: [
    {
      url: 'default'
    }
  ],
  nodeId: '0'
}

LocalAssistancePage.propTypes = {
  lineage: PropTypes.arrayOf(PropTypes.object),
  nodeId: PropTypes.string
}

export default LocalAssistancePage
