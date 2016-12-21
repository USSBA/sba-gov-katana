import React from 'react';
// import styles from '../../styles/buttons.scss';
import styles from '../../styles/landing-page/find-lenders-intro.scss'
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
                        className={ styles.tellMeHowBtn }
                        onClick={this.scroll.bind(this)}
                >
                    TELL ME HOW
                </Button>
            </div>
        )
    }
}

export default HelpMeBtn;