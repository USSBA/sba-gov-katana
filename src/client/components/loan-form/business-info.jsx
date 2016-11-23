import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CurrencyInput, TextInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import * as BusinessInfoActions from '../../actions/business-info.js'
import { browserHistory } from 'react-router';
import { Col } from 'react-bootstrap';


class BusinessInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            businessFields: {
                businessName: "",
                businessZipcode: "",
                businessWebsite: "",
                businessType: "",
                businessDescription: ""
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createBusinessInfo(this.state.businessFields);
        browserHistory.push('/form/additional');
        this.loanForm.reset()
    }

    handleChange(e){
        let businessFields = {};
        businessFields[e.target.name] = e.target.value;
        this.setState({businessFields: {...this.state.businessFields, ...businessFields}});
        console.log(this.state.businessFields)
    }

    render() {
        return (
            <div>
                <form ref={(input) => this.loanForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 className="col-xs-2 col-xs-offset-5">Business Info</h2>
                    <TextInput     label="What is the name of your business?"
                                   name="businessName"
                                   handleChange={this.handleChange.bind(this)}
                    />

                    <TextInput     label="What is the business ZIP code?"
                                   name="businessZipcode"
                                   handleChange={this.handleChange.bind(this)}
                    />

                    <TextInput     label="What is your business website?"
                                   name="businessWebsite"
                                   handleChange={this.handleChange.bind(this)}
                    />
                    <SelectBox label="What type of business is it?"
                               name="businessType"
                               handleChange={this.handleChange.bind(this)}
                    >
                        <option value="Profit">Profit</option>
                        <option value="Non-profit">Non-profit</option>
                    </SelectBox>
                    <TextInput     label="Describe what your business does"
                                   name="businessDescription"
                                   handleChange={this.handleChange.bind(this)}
                    />
                    <button className="col-xs-2 col-xs-offset-5" type="submit"> Next </button>

                </form>
            </div>
        );
    };
}

function mapReduxStateToProps(reduxState) {
    console.log(reduxState);
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(BusinessInfoActions, dispatch)
    }
}

export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(BusinessInfoForm);
