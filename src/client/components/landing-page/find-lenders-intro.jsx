import React from 'react';
import {FindLendersBtn} from './find-lenders-btn.jsx'
import {HelpMeBtn} from './help-me-btn.jsx'
import styles from '../../styles/landing-page/find-lenders-intro.scss'

export const FindLendersIntro = (props) =>
    <div className = {styles.parentContainer}>
        <GreenFindLendersSection />
    </div>


export const GreenFindLendersSection = (props) =>
    <div className = {styles.greenBox}>
        <div className = {styles.title}>
            Lender Match helps you find lenders.
        </div>
        <div className = {styles.subTitle}>
            Lender Match (formerly LINC) is a free online referral tool that connects small business with participating SBA-approved lenders.
        </div>
        <div className = " container-fluid">
            <div className = " col-md-6">
                <HelpMeBtn />
            </div>
            <div className=" col-md-6">
                <FindLendersBtn/>
            </div>
        </div>
    </div>