import React from 'react';
import {FindLendersBtn} from './find-lenders-btn.jsx'
import {HelpMeBtn} from './help-me-btn.jsx'
import {Button} from 'react-bootstrap'
import styles from '../../styles/landing-page/find-lenders-intro.scss'
import findLendersImage from '../../../../public/assets/images/lender-match/lendermatch-hero.jpg'


export const FindLendersIntro = (props) =>
    <div className=" container-fluid">
        <div className = {styles.parentContainer + " col-md-12"}>
            <GreenFindLendersSection />
            <FindLendersImage />
        </div>
    </div>


export const GreenFindLendersSection = (props) =>
    <div className = {styles.greenBox}>
        <div className = {styles.title}>
            Lender Match helps you find lenders.
        </div>
        <div className = {styles.subTitle}>
            Lender Match (formerly LINC) is a free online referral tool that connects small business with participating SBA-approved lenders.
        </div>
        <div className = {styles.btnContainer + " container-fluid"}>
            <div className = " col-xs-4">
                <HelpMeBtn />
            </div>
            <div className=" col-xs-4">
                <Button block className={styles.findLendersWhiteBtn} onClick={(e) => browserHistory.push('/form/contact')}>FIND LENDERS</Button>
            </div>
        </div>
    </div>

export const FindLendersImage = (props) =>
    <div className = {styles.imageContainer}>
        <img src={ findLendersImage } alt="Match with lenders" width="947" height="646"/>
    </div>