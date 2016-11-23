import React from 'react';
import { connect } from 'react-redux';
//import {bindActionCreators}from 'redux';

import FormInput from '../form-input/form-input.jsx';
//require('./styles/contact-input.scss');

class ReviewInfoForm extends React.Component {

    render() {
        return (
            <div>
                <h2>Review and Submit</h2>
                {this.props.reviewInfo.map((inputDetail, i)=>{
                    return(
                        <FormInput {...this.props} key={i} i={i} inputDetail={inputDetail}/>
                    );
                })}
                <br/>
                <button className="continueBtn" onClick={event => console.log("continuing to next page")}> See Matches </button>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        reviewInfo: state.reviewInfo
    };
}


/*function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(saveInput, dispatch)
    };
}*/

export default connect(
    mapStateToProps//, mapDispatchToProps
)(ReviewInfoForm);