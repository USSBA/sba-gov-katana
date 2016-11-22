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

    handleSubmit(e){
        e.preventDefault();
    };

    render(){
        return (
            <div>
                <h3>Additional Info</h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>What's your industry experience?</div>
                    <DropdownList data={colors}  />
                    <div>Check all that apply to you: </div>
                    <SelectList multiple={true} data={extraBusinessInfoChecklist} />
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
