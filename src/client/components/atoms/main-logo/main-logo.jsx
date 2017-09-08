import React from 'react';
import sbaLogo from '../../../../../public/assets/images/logo.png';
import styles from "./main-logo.scss"
import {BasicLink} from "atoms"

class MainLogo extends React.Component{
    render(){
        return(
            <div className={ styles.logoNew } >
                <BasicLink tabIndex="-1" url="/">
                    <img alt="Small Business Administration" src={ sbaLogo } />
                </BasicLink>
             </div>
        );
    }
}
export default MainLogo;
