import React from 'react';
import styles from '../../styles/buttons.scss';
import {Button } from 'react-bootstrap'

export class CounselorBtn extends React.Component {
    render(){
        return(
            <div>
                <Button block className={ styles.helpBtn }>TALK TO A COUNSELOR</Button>
            </div>
        )
    }
}

export default CounselorBtn;