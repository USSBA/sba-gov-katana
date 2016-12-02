import React from 'react';
import {Panel, ButtonToolbar} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import styles from '../common/styles.scss';

export const FormPanel = ({title, subtitle, ...props}) =>

    <Panel className={"col-xs-12 col-lg-6 col-lg-offset-3 " + styles.formPanel}>
        <ButtonToolbar>
            <button type="button" className="btn btn-default btn-sm pull-left" onClick={browserHistory.goBack}>
                <span className="glyphicon glyphicon-chevron-left"></span> Back
            </button>
        </ButtonToolbar>

        <h2 className="col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3">{title}</h2>
        <p className="col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3">{subtitle}</p>
        {props.children}
    </Panel>;