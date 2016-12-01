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

        <h2 className="col-md-4 col-md-offset-4 text-center">{title}</h2>
        {/*<div className="col-md-4 col-md-offset-4 text-center">{subtitle}</div>*/}
        {props.children}
    </Panel>;