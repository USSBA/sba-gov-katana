import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

export class DynamicLenderMatches extends React.Component{
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
            <div className="col-md-6">
                <h3 className="text-center"> Dynamic Lender Matches</h3>
                <div>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </div>
            </div>
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
)(DynamicLenderMatches);


