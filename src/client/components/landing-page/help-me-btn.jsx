import React from 'react';
import styles from '../../styles/buttons.scss';
import {Button } from 'react-bootstrap'

export class HelpMeBtn extends React.Component {

    scroll(){
        let element = document.getElementById("preparation-checklist");
        element.scrollIntoView({block: "start", behavior: "smooth"});
    }

    render(){
        return(
            <div>
                <Button block
                        className={ styles.helpBtn }
                        onClick={this.scroll.bind(this)}
                >
                    Help Me Get Ready
                </Button>
            </div>
        )
    }
}

export default HelpMeBtn;