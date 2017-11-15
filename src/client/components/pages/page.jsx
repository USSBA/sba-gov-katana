import React from 'react'
import BasicPage from '../templates/basic-page/basic-page.jsx'
import ProgramPage from '../templates/program-page/program-page.jsx'
import * as RestContentActions from '../../actions/rest-content.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

class Page extends React.Component {
  componentWillMount() {
    const id = this.props.nodeId
    if (id > 0) {
      this.props.actions.fetchContentIfNeeded('node', id)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const id = nextProps.nodeId
    if (id > 0) {
      nextProps.actions.fetchContentIfNeeded('node', id)
    }
  }

  render() {
    const section = this.props.lineage[0].url
    if (this.props.data && this.props.lineage) {
      if (this.props.data.type === 'page') {
        return (
          <BasicPage
            title={this.props.data.title}
            paragraphs={this.props.data.paragraphs}
            summary={this.props.data.summary}
            lineage={this.props.lineage}
          />
        )
      } else if (this.props.data.type === 'programPage') {
        let heroData
        if (this.props.data) {
          heroData = {
            title: this.props.data.title,
            summary: this.props.data.summary,
            buttons: this.props.data.buttons,
            bannerImage: this.props.data.bannerImage
          }
        }

        return (
          <ProgramPage
            lineage={this.props.lineage}
            heroData={heroData}
            title={this.props.data.title}
            paragraphs={this.props.data.paragraphs}
            lineage={this.props.lineage}
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
  nodeId: 0
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    data: _.get(reduxState, 'restContent.node[' + ownProps.nodeId + ']')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Page)

export { Page }
