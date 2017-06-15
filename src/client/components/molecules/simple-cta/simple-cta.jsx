import React from "react"
import styles from "./simple-cta.scss";
import {SmallSecondaryButton} from "../../atoms";

class SimpleCta extends React.Component{
    render(){
        return (
            <div className={styles.container}>
                <p>{this.props.actionText}</p>
                <SmallSecondaryButton url={this.props.url} text={this.props.buttonText}/>
            </div>
        );
    }
}

SimpleCta.defaultProps = {
    url: "https://www.sba.gov",
    buttonText: "Go To SBA",
    actionText: "This is a Simple CTA"
}

export default SimpleCta;
