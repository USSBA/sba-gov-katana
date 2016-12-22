import React from 'react';
import {FindLendersBtn} from './find-lenders-btn.jsx'
import {HelpMeBtn} from './help-me-btn.jsx'
import {Button} from 'react-bootstrap'
import { browserHistory } from 'react-router';
import styles from '../../styles/landing-page/find-lenders-intro.scss'
import findLendersImage from '../../../../public/assets/images/lender-match/lendermatch-hero.jpg'
import cornerGraphic from '../../../../public/assets/images/lender-match/rectangle-corner-graphic.png'

export const FindLendersIntro = (props) =>
    <div className= " row">
        <div className = {styles.parentContainer + " col-xs-12 nopadding"}>
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
            <div className = " col-sm-4 col-xs-12 nopadding">
                <HelpMeBtn />
            </div>
            <div className=" col-sm-4 col-xs-12 nopadding">
                <Button block className={styles.findLendersWhiteBtn} onClick={(e) => browserHistory.push('/form/contact')}>FIND LENDERS</Button>
            </div>
        </div>
        <img src={ cornerGraphic } aria-hidden="true" width="166" height="166" />
    </div>


export const FindLendersImage = (props) =>
    <div className = {styles.imageContainer}>
        <img src={ findLendersImage } alt="Match with lenders" width="947" height="646"/>
    </div>