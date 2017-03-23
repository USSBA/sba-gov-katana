import React from 'react';
import { browserHistory } from 'react-router';
import { Col, Row, Button, ButtonToolbar } from 'react-bootstrap';


class ReviewSection extends React.Component {
  constructor() {
    super();
  }

  mapSectionContentToList() {
    var list = [];
    if (this.props.label === "Additional") {
      var sectionContent = this.props.sectionContent
      Object.keys(sectionContent).map(function(key, index) {
        if (key.length > 0) {
          if (key === "hasWrittenPlan") {
            list.push(<li key={ index }>I have a written business plan</li>)
          } else if (key === "hasFinancialProjections") {
            list.push(<li key={ index }>I have financial projections</li>)
          } else if (key === "isGeneratingRevenue") {
            list.push(<li key={ index }>I'm generating revenue</li>)
          } else if (key === "isVeteran") {
            list.push(<li key={ index }>I'm a veteran</li>)
          }
        }
      })
    } else {
      var sectionContent = this.props.sectionContent;
      if (sectionContent) {
        Object.keys(sectionContent).map(function(key, index) {
          if (sectionContent[key].length > 0) {
            list.push(<li key={ index }>
                        { sectionContent[key] }
                      </li>)
          }
        })
      }
    }
    return list
  }

  handleClick() {
    browserHistory.push(this.props.editPath)
  }

  render() {
    return (
      <div>
        <h4>{ this.props.label }</h4>
        <button className="pull-right" onClick={ this.handleClick.bind(this) }>
          Edit
        </button>
        <ul>
          { this.mapSectionContentToList() }
        </ul>
      </div>
    )
  }
  ;
}


export default ReviewSection;