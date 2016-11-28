import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, CheckBox} from '../helpers/form-helpers.jsx';
import * as ReviewSubmitInfoActions from '../../actions/review-submit-info.js';
import { browserHistory } from 'react-router';


class ReviewSubmitInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            reviewSubmitInfoFields: {}
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createReviewSubmitInfo(this.state.reviewSubmitInfoFields);
        browserHistory.push("/success");
        this.reviewSubmitInfoForm.reset();
    }

    handleChange(e){
        let reviewSubmitInfoFields = {};
        reviewSubmitInfoFields[e.target.name] = e.target.value;
        this.setState({reviewSubmitInfoFields: {...this.state.reviewSubmitInfoFields, ...reviewSubmitInfoFields}});
        console.log(this.state.reviewSubmitInfoFields);
    }

    handleClick(e){
        let reviewSubmitInfoFields = {};
        reviewSubmitInfoFields[e.target.name] = e.target.value;
        this.setState({reviewSubmitFields: {...this.state.reviewSubmitInfoFields, ...reviewSubmitInfoFields}});
        console.log(this.state.reviewSubmitInfoFields);
    }

    render() {
        return (
            <div>
                <form ref={(input) => this.reviewSubmitInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 className="col-xs-2 col-xs-offset-5">Review and Submit</h2>
                    <TextInput     label="Name"
                                   name="reviewName"
                                   handleChange={this.handleChange.bind(this)}
                                   value="Jordan Watts"
                    />

                    <TextInput     label="Address"
                                   name="reviewAddress"
                                   handleChange={this.handleChange.bind(this)}
                                   value="8 Market Pl, Baltimore, MD 21202"
                    />

                    <TextInput     label="Funds Needed"
                                   name="reviewNeededFunds"
                                   handleChange={this.handleChange.bind(this)}
                                   value="$1,000,000"
                    />
                    <TextInput     label="Use of Funds"
                                   name="reviewUseOfFunds"
                                   handleChange={this.handleChange.bind(this)}
                                   value="Purchasing equipment"
                    />
                    <TextInput     label="Use of Funds Description"
                                   name="reviewUseOfFundsDescription"
                                   handleChange={this.handleChange.bind(this)}
                                   value="I think you get the picture"
                    />
                    <CheckBox     label="Please email me in the future about improving this tool."
                                   name="reviewEmailProspect"
                                   handleClick={this.handleClick.bind(this)}
                    />
                    <button className="col-xs-2 col-xs-offset-5" type="submit"> See Matches </button>
                </form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    //console.log(reduxState);
    return {
        reviewSubmitInfoData: state.reviewSubmitInfoData
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(ReviewSubmitInfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewSubmitInfoForm);
