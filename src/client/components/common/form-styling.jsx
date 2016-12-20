import React from 'react';
import {Panel} from 'react-bootstrap';
import styles from '../common/styles.scss';

export const FormPanel = ({title, subtitle, backButtonText, ...props}) =>

    <Panel className={"col-xs-12 col-md-6 col-md-offset-3 " + styles.formPanel}>
        <h2 className="col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3">{title}</h2>
        <p className="col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3">{subtitle}</p>
        {props.children}
    </Panel>;