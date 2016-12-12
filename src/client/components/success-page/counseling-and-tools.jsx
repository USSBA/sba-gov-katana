import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {Row, Col, Button} from 'react-bootstrap';
import styles from '../../styles/success-page/counseling-and-tools.scss';


export class DynamicCounselingAndTools extends React.Component{
    constructor(){
        super();
    }

    componentWillMount(){
        console.log(this.props)
        axios.post('/matchCounselors', {
            zipcode: this.props.businessInfoData.businessInfoZipcode
        })
            .then(function (res){
                document.location = res.data.redirectTo
            })
            .then(function (err){console.log(err)})
    }

    render(){
        return (
            <Row className = {styles.section} >
                <Col sm={12} md={12} lg={12}>
                    <p className={styles.title + " text-center"}> Get free, personalized help from a local counselor</p>
                    <Row>
                        <Col sm={12}>
                            <p className=" text-center">Local counselors can help you prepare materials and introduce you to additonal lenders</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} xsOffset={2} sm={4} smOffset={4} md={4} mdOffset={4}>
                            <Button className={styles.seeMoreBtn}>SEE MORE</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    };
}


function mapStateToProps(state) {
    return {
        businessInfoData: state.businessInfoReducer.businessInfoData
    };
}

export default connect(
    mapStateToProps
)(DynamicCounselingAndTools)

