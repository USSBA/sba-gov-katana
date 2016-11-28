import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, SelectBox } from '../helpers/form-helpers.jsx'
import * as BusinessInfoActions from '../../actions/business-info.js'
import { browserHistory } from 'react-router';


class BusinessInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            businessInfoFields: {}
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createBusinessInfo(this.state.businessInfoFields);
        browserHistory.push('/form/additional');
        this.businessInfoForm.reset()
    }

    handleChange(e){
        let businessInfoFields = {};
        businessInfoFields[e.target.name] = e.target.value;
        this.setState({businessInfoFields: {...this.state.businessInfoFields, ...businessInfoFields}});
        console.log(this.state.businessInfoFields)
    }

    render() {
        return (
            <div>
                <form ref={(input) => this.businessInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 className="col-xs-2 col-xs-offset-5">Business Info</h2>
                    <TextInput     label="What is the name of your business?"
                                   name="businessInfoName"
                                   handleChange={this.handleChange.bind(this)}
                    />

                    <TextInput     label="What is the business ZIP code?"
                                   name="businessInfoZipcode"
                                   handleChange={this.handleChange.bind(this)}
                    />

                    <TextInput     label="What is your business website?"
                                   name="businessInfoWebsite"
                                   handleChange={this.handleChange.bind(this)}
                    />
                    <SelectBox label="What type of business is it?"
                               name="businessInfoType"
                               handleChange={this.handleChange.bind(this)}
                    >
                        <option value="Profit">Profit</option>
                        <option value="Non-profit">Non-profit</option>
                    </SelectBox>
                    <TextInput     label="Describe what your business does"
                                   name="businessInfoDescription"
                                   handleChange={this.handleChange.bind(this)}
                    />
                    <button className="col-xs-2 col-xs-offset-5" type="submit"> Next </button>

                </form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    //console.log(reduxState);
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(BusinessInfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessInfoForm);
