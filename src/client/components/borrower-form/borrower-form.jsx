import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FormActions from '../../actions/form.js'

import Header from '../common/header.jsx';
import Footer from '../common/footer.jsx';


class BorrowerForm extends React.Component {

    handleSubmit(e){
        e.preventDefault();
        const formData = {
            textInput: this.textInput.value,
            selectInput: this.selectInput.value,
            checkboxInput: this.checkboxInput.value
        };
        this.props.actions.submitFormData;
        this.borrowerForm.reset();
    }

    render() {
        return (
            <div>
                <Header />

                <form ref={(input) => this.borrowerForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <input ref={(input) => this.textInput = input} type="text"/>
                    <select ref={(input) => this.selectInput = input}>
                        <option value="option-1">option-1</option>
                        <option value="option-2">option-2</option>
                    </select>
                    <input ref={(input) => this.checkboxInput = input} type="checkbox" value="value"/>
                    <button type="submit"> See Matches </button>
                </form>

                <Footer />
            </div>
        );
    };
}

function mapReduxStateToProps(reduxState) {
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(FormActions, dispatch)
    }
}
export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(BorrowerForm);
