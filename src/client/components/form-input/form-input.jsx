import React from 'react';
//import { connect } from 'react-redux';
//import {bindActionCreators}from 'redux';
//import * as updateInput from '../../../actions/update-input.js';
//require('../styles/contact-input.scss');



class FormInput extends React.Component {
    render() {
        const {inputDetail, i, ref} = this.props;
        //const inputValue = this.ref.inputData.value;
        return (
            <div>
                <label>{inputDetail.inputLabel}</label><br/>
                <input className="contact-input" defaultValue={inputDetail.inputData} />
            </div>
        );
    };
}

/*function mapStateToProps(state) {
 return {
 contactInfo: state.contactInfo
 };
 }


 function mapDispatchToProps(dispatch) {
 return {
 updateInput:bindActionCreators(updateInput, dispatch)
 };
 }*/
export default FormInput;
/*
 export default connect(
 mapStateToProps,
 mapDispatchToProps
 )(ContactInput);*/