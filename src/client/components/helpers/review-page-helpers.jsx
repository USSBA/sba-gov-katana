import React from 'react';
import {browserHistory} from 'react-router';

// export const ReviewSection = ({label, editPath, sectionContent, ...props}) =>
//     <div >
//         <h4 className="col-xs-12 col-lg-6 col-lg-offset-3">{label}</h4>
//         {for (var i = )}
//     </div>
//


class ReviewSection extends React.Component {
    constructor(){
        super();
    }

    mapSectionContentToList(){
        var list = ''
        for (var key in this.props.sectionContent){
            <li>{this.props.sectionContent[key]}</li>
        }
        return list
    }

    render(){
        return (
            <div >
                <h4 className="col-xs-12 col-lg-6 col-lg-offset-3">{this.props.label}</h4>
                <ul>
                    {this.mapSectionContentToList()}
                </ul>
             </div>
        )
    };
}


export default ReviewSection;