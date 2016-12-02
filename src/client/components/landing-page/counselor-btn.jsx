import React from 'react';
import styles from '../common/styles.scss';
import {Button } from 'react-bootstrap'

export class CounselorBtn extends React.Component {
    render(){
        return(
            <div>
                <Button block className={ styles.btn+ " " + styles.whiteBtn}>TALK TO A COUNSELOR</Button>
            </div>
        )
    }
}

export default CounselorBtn;