import React, { PropTypes } from 'react'
import BasicPage from '../templates/basic-page/basic-page.jsx'
import ProgramPage from '../templates/program-page/program-page.jsx'
import { fetchRestContent } from '../../fetch-content-helper.js'
import { getLanguageOverride } from '../../services/utils.js'

class Page extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  componentWillMount() {
    const langOverride = getLanguageOverride()
    const id = this.props.nodeId
    if (id > 0) {
      fetchRestContent('node', id, langOverride).then(data => {
        this.setState({ data })
      })
    }
  }

  render() {
    const { data } = this.state
    if (data && this.props.lineage) {
      if (data.type === 'page') {
        return (
          <BasicPage
            title={data.title}
            paragraphs={data.paragraphs}
            summary={data.summary}
            lineage={this.props.lineage}
          />
        )
      } else if (data.type === 'programPage') {
        let heroData
        if (data) {
          heroData = {
            title: data.title,
            summary: data.summary,
            buttons: data.buttons,
            bannerImage: data.bannerImage
          }
        }

        return (
          <ProgramPage
            lineage={this.props.lineage}
            heroData={heroData}
            title={data.title}
            paragraphs={data.paragraphs}
          />
        )
      }
    }
    return <div />
  }
}

Page.defaultProps = {
  lineage: [
    {
      url: 'default'
    }
  ],
  nodeId: '0'
}

Page.propTypes = {
  lineage: PropTypes.arrayOf(PropTypes.object),
  nodeId: PropTypes.string
}

export default Page
