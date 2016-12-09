import React from 'react';
import {browserHistory} from 'react-router';
import { Col, Row, Button, ButtonToolbar } from 'react-bootstrap';


class ReviewSection extends React.Component {
    constructor(){
        super();
    }


    // additionalInfoCases(key) {
    //     if (key === "hasWrittenPlan") {
    //         return "I have a written business plan"
    //     } else if (key === "hasFinancialProjections") {
    //         return "I have financial projections"
    //     } else if (key === "isGeneratingRevenue") {
    //         return "I'm generating revenue"
    //     } else if (key === "isVeteran") {
    //         return "I'm a veteran"
    //     }
    // }

    mapSectionContentToList() {
        var list = []
        if (this.props.label === "Additional") {
            var sectionContent = this.props.sectionContent
            Object.keys(sectionContent).map(function (key, index) {
                if(key.length > 0 ) {
                    if (key === "hasWrittenPlan") {
                        list.push(<li key={index}>I have a written business plan</li>)
                    } else if (key === "hasFinancialProjections") {
                        list.push(<li key={index}>I have financial projections</li>)
                    } else if (key === "isGeneratingRevenue") {
                        list.push(<li key={index}>I'm generating revenue</li>)
                    } else if (key === "isVeteran") {
                        list.push(<li key={index}>I'm a veteran</li>)
                    }
                    // var additionalInfoValue = this.additionalInfoCases(key)
                    // list.push(<li key={index}>{additionalInfoValue}</li>)
                }
            })
        } else {
            var sectionContent = this.props.sectionContent
            Object.keys(sectionContent).map(function (key, index) {
                if(sectionContent[key].length >0 ) {
                    list.push(<li key={index}>{sectionContent[key]}</li>)
                }
            })
        }
        return list
    }



    handleClick(){
        browserHistory.push(this.props.editPath)
    }

    render(){
        return (
            <div>
                <Row >
                    <Col xs={6} xsOffset={0} sm={3} smOffset={3} >
                        <h4>{this.props.label}</h4>
                    </Col>
                    <Col xs={6} xsOffset={0} sm={3}>
                        <ButtonToolbar>
                            <Button className="pull-right" onClick={this.handleClick.bind(this)}>
                                Edit
                            </Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Col xs={12} xsOffset={0} sm={6} smOffset={3}>
                    <ul>
                        {this.mapSectionContentToList()}
                    </ul>
                </Col>
             </div>
        )
    };
}


export default ReviewSection;