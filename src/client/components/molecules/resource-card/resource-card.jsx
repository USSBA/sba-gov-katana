import React from "react";
import {SmallPrimaryButton} from "atoms";
import styles from "./resource-card.scss";

class ResourceCard extends React.Component{
    render(){
        return (
          <div className={styles.resource}>
            <h4>{this.props.title}</h4>
            <p>
              {this.props.duration}
            </p>
            <hr/>
            <p>
              {this.props.description}
            </p>
            <SmallPrimaryButton text={this.props.buttonText} url={this.props.buttonURL} newWindow />
          </div>
      );
    }
}
export default ResourceCard;
