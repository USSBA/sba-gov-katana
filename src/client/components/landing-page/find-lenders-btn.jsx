import React from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import styles from '../common/styles.scss';


export const FindLendersBtn = (props) =>
    <div>
        <Button block className={styles.btn + " " + styles.blackBtn} onClick={(e) => browserHistory.push('/form/contact')}>FIND LENDERS</Button>
    </div>;

