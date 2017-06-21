import React from "react"
import styles from "./small-inverse-cta.scss";
import {SmallPrimaryButton} from "../../atoms";

class SmallInverseCta extends React.Component{
    render(){
        return (
            <div id="small-inverse-cta" className={styles.smallInverseCta}>
                <p>{this.props.actionText}</p>
                <SmallPrimaryButton url={this.props.url} text={this.props.buttonText}/>
            </div>
        );
    }
}

SmallInverseCta.defaultProps = {
    url: "https://www.sba.gov/business-guide",
    buttonText: "See the guide",
    actionText: "Not sure where to start? Start your business in 10 steps."
}

export default SmallInverseCta;
