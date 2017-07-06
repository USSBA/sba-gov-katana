import React from "react"
import styles from "./small-inverse-cta.scss";
import {SmallPrimaryButton} from "../../atoms";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as NavigationActions from "../../../actions/navigation.js";

class SmallInverseCta extends React.Component{

    handleClick() {
      this.props.actions.callToAction(this.props.url, this.props.eventCategory, this.props.eventLabel, 1);
    }
    render(){
        return (
            <div id="small-inverse-cta" className={styles.smallInverseCta}>
                <p>{this.props.actionText}</p>
                <SmallPrimaryButton onClick={this.handleClick.bind(this)} text={this.props.buttonText}/>
            </div>
        );
    }
}

SmallInverseCta.defaultProps = {
    url: "/",
    buttonText: "Go Home",
    actionText: "My Action Text",
    eventCategory: "Generic CTA",
    eventLabel: "Unknown"
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(NavigationActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(SmallInverseCta);
