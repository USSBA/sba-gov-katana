import React from 'react';
import {browserHistory} from 'react-router';

export const ReviewSection = ({label, editPath, sectionContent, ...props}) =>
    <div >
        <h4 className="col-xs-12 col-lg-6 col-lg-offset-3">{label}</h4>
    </div>