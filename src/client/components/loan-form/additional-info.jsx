import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CurrencyInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import { browserHistory } from 'react-router';
import { Col } from 'react-bootstrap';

import 'react-widgets/lib/less/react-widgets.less';
import DropdownList from 'react-widgets/lib/DropdownList';
import SelectList from 'react-widgets/lib/SelectList';

import * as AdditionalInfoActions from '../../actions/additional-info.js'

var extraBusinessInfoChecklist = [
    "I have a written business plan",
    "I have financial projections",
    "I'm generating revenue",
    "I'm a veteran"
]

class AdditionalInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            additionalInfoFields: {
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.reviewAnswers(this.state.additionalInfoFields);
        browserHistory.push("/success");
        this.addInfoForm.reset()
    };

    handleChange(e){
        let additionalInfoFields = {};
        additionalInfoFields[e.target.name] = e.target.value;
        this.setState({additionalInfoFields: {...this.state.additionalInfoFields, ...additionalInfoFields}})
        console.log(this.state)
    }

    handleCheckChange(e){
        var addInfo = {};
        addInfo["extraInfo"] = e;
        this.setState({additionalInfoFields: {...this.state.additionalInfoFields, ...addInfo}});
        console.log(this.state);
    }

    render(){
        return (
            <div>
                <h3>Additional Info</h3>
                <form ref={(input) => this.addInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <div>What's your industry experience?</div>
                    <SelectBox name = "industryExp" handleChange={this.handleChange.bind(this)}>
                        <option defaultValue=""></option>
                        <option value="none">none</option>
                        <option value="lots">lots</option>
                    </SelectBox>
                    <div>Check all that apply to you: </div>


                    <SelectList data={extraBusinessInfoChecklist} multiple={true} onChange={this.handleCheckChange.bind(this)} />





                    <button className="col-xs-2 col-xs-offset-5" type="submit">Review Answers</button>
                </form>
            </div>
        )
    }
}


function mapReduxStateToProps(reduxState) {
    console.log(reduxState)
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(AdditionalInfoActions, dispatch)
    }
}
export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(AdditionalInfoForm);
