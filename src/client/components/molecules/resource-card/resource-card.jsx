import React from 'react';
import styles from "./resource-card.scss"
import SmallPrimaryButton from "../../atoms/small-primary-button/small-primary-button.jsx"

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
            <SmallPrimaryButton text={this.props.buttonText} URL={this.props.buttonURL} newWindow />
          </div>
      );
    }
}
export default ResourceCard;
