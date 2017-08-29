import React from 'react';
import sbaLogo from '../../../../../public/assets/images/logo.png';
import styles from "./main-logo.scss"
import {navigateOnClick} from "../../../services/navigation";

class MainLogo extends React.Component{
    render(){
        return(
            <div className={ styles.logoNew } >
             <a tabIndex="-1" onTouchTap={navigateOnClick("/")}><img alt="Small Business Administration" src={ sbaLogo } /></a>
             </div>
        );
    }
}
export default MainLogo;
