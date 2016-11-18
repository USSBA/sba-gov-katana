import React from 'react';

import styles from '../App.css';

class Success extends React.Component{
    render(){
        return (
            <div className={styles.successHeader} >
                <h2> Success </h2>
                <div>
                    Next Step Confirm Email
                </div>
            </div>
        );
    };
}
export default Success;