import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import 'react-widgets/lib/less/react-widgets.less';
import DropdownList from 'react-widgets/lib/DropdownList';
import SelectList from 'react-widgets/lib/SelectList';

import * as AdditionalInfoActions from '../../actions/additional-info-page.js'

var colors = ["red", "blue"];

var extraBusinessInfoChecklist = [
    "I have a written business plan",
    "I have financial projections",
    "I'm generating revenue",
    "I'm a veteran"
]

class AdditionalInfoPage extends React.Component {

    constructor(){
        super();
        this.state ={
            additionalInfoFields: {

            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state)
    };

    handleChange(e){
        let additionalInfoFields = {};
        additionalInfoFields[e.target.name] = e.target.value;
        this.setState({additionalInfoFields: {...this.state.additionalInfoFields, ...additionalInfoFields}})
        console.log(this.state.additionalInfoFields)
    }

    render(){
        return (
            <div>
                <h3>Additional Info</h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>What's your industry experience?</div>
                    <DropdownList data={colors} name="additionalExp" value={this.state.additionalInfoFields.industryExp} onChange={this.handleChange.bind(this)} />
                    <div>Check all that apply to you: </div>
                    <SelectList multiple={true} data={extraBusinessInfoChecklist} value={this.state.additionalInfoFields.extraExp} onChange={value => this.setState({value})} />
                    <button type="submit">Review Answers</button>
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
        actions: bindActionCreators({AdditionalInfoActions}, dispatch)
    }
}
export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(AdditionalInfoPage);
