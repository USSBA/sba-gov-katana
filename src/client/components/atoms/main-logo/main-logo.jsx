import React from 'react';
import sbaLogo from '../../../../../public/assets/images/logo.png';
import styles from "./main-logo.scss"

class MainLogo extends React.Component{
    render(){
        return(
            <div className={ styles.logoNew } >
             <a tabIndex="-1" href="/"><img alt="Small Business Administration" src={ sbaLogo } /></a>
             </div>
        );
    }
}
export default MainLogo;
