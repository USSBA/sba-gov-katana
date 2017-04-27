import React from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import * as ModalActions from "../../actions/show-modal.js";
import * as ContentActions from "../../actions/content.js";
import styles from "./news-modal.scss";
import TextInput from "../atoms/text-input.jsx";
import exitIcon from "../../../../public/assets/svg/close_button.svg";
import {logEvent} from "../../services/analytics.js";
import constants from "../../services/constants.js";
import config from "../../services/client-config.js";
import {getEmailValidationState, getZipcodeValidationState, containsErrorOrNull} from "../../services/page-validator-helpers.js";
import {includes} from "lodash";
import envelopeIcon from '../../../../public/assets/svg/envelope.svg';
import SmallPrimaryButton from "../atoms/small-primary-button/small-primary-button.jsx";

class SbaNewsModal extends React.Component {
    timerId = null;

    constructor(props) {
        super();
        this.state = {
            userEmailAddress: "",
            userZipCode:  "",
            modalIsOpen: config.govdelivery,
            displayForm: true,
            validStates: {
                userEmailAddress: null,
                userZipCode: null
            }
        };
    }

    componentDidMount() {
        this.validateFields(["userEmailAddress", "userZipCode"]);
        window.scrollTo(0, 0);
        console.log(config.govdelivery);
    }


    validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
        let validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessful || null);
        if(validationState[name] === "error"){
            logEvent({"category": "Newsletter Modal", "action": "Error Event", "label": name});
        }
        return validationState;
    }

    validateFields(fields, defaultWhenNotSuccessful) {
        let validStates = this.state.validStates;

        if (includes(fields, "userEmailAddress")) {
            validStates = Object.assign(validStates, this.validateSingleField(getEmailValidationState, "userEmailAddress", defaultWhenNotSuccessful));
        }
        if (includes(fields, "userZipCode")) {
            validStates = Object.assign(validStates, this.validateSingleField(getZipcodeValidationState, "userZipCode", defaultWhenNotSuccessful));
        }
        this.setState({validStates: validStates})
    }

    isValidForm() {
        return !containsErrorOrNull(this.state.validStates);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.actions.fetchContentIfNeeded("newsletterRegistration", "newsletter-registration", {
            userEmailAddress: this.state.userEmailAddress,
            userZipCode: this.state.userZipCode
        });

        this.setState({displayForm: false});
        this.timerId = setTimeout(()=>{
            this.setState({modalIsOpen: false});
        }, 5000);
    }

    componentWillUnmount(){
        if(this.timerId != null){
            clearTimeout(timerId);
        }
    }

    handleChange(e) {
        let newState = {};
        let name = e.target.name;
        newState[name] = e.target.value;
        this.setState(newState, () => this.validateFields([name]));
    }

    handleBlur(e) {
        this.validateFields([e.target.name], "error");
    }

    handleFocus(nameOrEvent) {
        let name = nameOrEvent && nameOrEvent.target && nameOrEvent.target.name
            ? nameOrEvent.target.name
            : nameOrEvent;
        logEvent({"category": "Newsletter Modal", "action": "Focus Event", "label": name});
    }

    handleClose(e){
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <ReactModal isOpen={this.state.modalIsOpen} className={styles.content} overlayClassName={styles.overlay} contentLabel="Modal">
                <div>
                    <h2 className={this.state.displayForm ? styles.title : styles.hideForm}>Get business advice and invitations to local business events.</h2>
                    <a onClick={this.handleClose.bind(this)}><img className={styles.exitIcon} src={exitIcon}/></a>
                </div>
                <div className={this.state.displayForm ? styles.showForm : styles.removeForm}>
                    <form id="newsletter-modal-form" ref={(input) => this.newsletterModalForm = input} onSubmit={(e) => this.handleSubmit(e)} >
                        <TextInput name="userEmailAddress" errorText={constants.messages.validation.invalidNewsLetterEmail} placeholder="Your email address"  handleChange={this.handleChange.bind(this)} value={this.state.userEmailAddress} getValidationState={this.state.validStates.userEmailAddress} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
                        <div className="sba-blue">
                            <div className={styles.zipTextBox}><TextInput name="userZipCode" errorText={constants.messages.validation.invalidNewsLetterZipCode}  placeholder="Zip code"  handleChange={this.handleChange.bind(this)} value={this.state.userZipCode} getValidationState={this.state.validStates.userZipCode} maxLength="5" onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/></div>
                                <div className={styles.btnContainer}>
                                    <SmallPrimaryButton text="SUBSCRIBE" type="submit" disabled={!(this.isValidForm())}/>
                                </div>
                        </div>
                        <p className={styles.privacyLink}><a  href="about-sba/sba-performance/open-government/about-sbagov-website/privacy-policy">Privacy policy</a></p>
                    </form>
                </div>

                <div className={this.state.displayForm ? styles.hideForm : styles.showForm}>
                    <img className={styles.envelopeIcon} src={envelopeIcon}/>
                    <p className={styles.byeMsg}>Thanks for subscribing!</p>
                </div>
            </ReactModal>
        );
    }
}

function mapStateToProps(state) {
    return {
        userEmailAddress: state.modalReducer.modalProps.userEmailAddress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ContentActions, dispatch),
        modalActions: bindActionCreators(ModalActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SbaNewsModal);