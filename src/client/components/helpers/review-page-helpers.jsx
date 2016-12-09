import React from 'react';
import {browserHistory} from 'react-router';
import { Col, Row, Button, ButtonToolbar } from 'react-bootstrap';


class ReviewSection extends React.Component {
    constructor(){
        super();
    }

    mapSectionContentToList(){
        var sectionContent = this.props.sectionContent
        var list = []
        Object.keys(sectionContent).map(function(key, index){
            list.push(<li  key={index}>{sectionContent[key]}</li>)
        })
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