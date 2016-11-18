import React from 'react';
import { connect } from 'react-redux';

import LandingPage from './landing-page/landing-page.jsx';

class LincMain extends React.Component{
    render(){
        return (
            <div>
                <LandingPage className={this.props.page !== 'landing' ? "hidden" : ""}/>
            </div>    
        );
    }
}

function mapReduxStateToProps(state){
    return {
        page: state.page
    };
}

export default connect(
mapReduxStateToProps,
null    
    
)(LincMain);