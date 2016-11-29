import React from 'react';
import {Panel, ButtonToolbar} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import styles from '../common/styles.scss';

export const FormPanel = ({title, ...props}) =>

    <Panel className={"col-sm-6 col-sm-offset-3 " + styles.formPanel}>
        <ButtonToolbar>
            <button type="button" className="btn btn-default btn-sm pull-left" onClick={browserHistory.goBack}>
                <span className="glyphicon glyphicon-chevron-left"></span> Back
            </button>
        </ButtonToolbar>

        <h2 className="col-md-4 col-md-offset-4 text-center">{title}</h2>
        {props.children}
    </Panel>;