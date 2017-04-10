import React from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../styles/buttons.scss';

class LightButton extends React.Component{
    handleClick(){
        window.open(this.props.href, "_blank");
    }
    render(){
        return (<div>
          <Button block onClick={this.handleClick.bind(this)} className={ styles.helpBtn }>{this.props.text}</Button>
        </div>);
    }
}

export default LightButton;
