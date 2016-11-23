import React from 'react';
import { connect } from 'react-redux';
//import {bindActionCreators}from 'redux';

import FormInput from '../form-input/form-input.jsx';
//require('./styles/contact-input.scss');

class BusinessInfoForm extends React.Component {

    render() {
        return (
            <div>
                <h2>Business Information</h2>
                {this.props.businessInfo.map((inputDetail, i)=>{
                    return(
                        <FormInput {...this.props} key={i} i={i} inputDetail={inputDetail}/>
                    );
                })}
                <br/>
                <button className="continueBtn" onClick={event => console.log("continuing to next page")}> Continue </button>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        businessInfo: state.businessInfo
    };
}


/*function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(saveInput, dispatch)
    };
}*/

export default connect(
    mapStateToProps//, mapDispatchToProps
)(BusinessInfoForm);