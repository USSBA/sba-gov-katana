import React from "react"
import styles from "./previous-next.scss";
import SmallSecondaryButton from "../../atoms/small-secondary-button/small-secondary-button.jsx";

class PreviousNextSection extends React.Component{

    calculateParameters() {
        let shortLineage = _.takeRight(this.props.lineage, 2);
        let container = _.head(shortLineage).children;
        let current = _.last(shortLineage);
        let currentIndex = _.indexOf(container, current);
        let retParams = {};
        if(currentIndex === 0 && _.size(container) === 1){
            retParams.previousText = null;
            retParams.nextText = null;
        }else if(currentIndex === 0){
            retParams.previousText = null;
            retParams.nextText =  _.nth(container, currentIndex + 1).title;
            retParams.nextUrl = _.nth(container, currentIndex + 1).fullUrl;
        }else if(currentIndex === _.size(container) - 1){
            retParams.previousText = _.nth(container, currentIndex - 1).title;
            retParams.previousUrl = _.nth(container, currentIndex - 1).fullUrl;
            retParams.nextText = null;
        }else{
            retParams.previousText = _.nth(container, currentIndex - 1).title;
            retParams.previousUrl = _.nth(container, currentIndex - 1).fullUrl;
            retParams.nextText = _.nth(container, currentIndex + 1).title;
            retParams.nextUrl = _.nth(container, currentIndex + 1).fullUrl;
        }
        return retParams;
    }

    calculateMobileParameters() {
        let shortLineage = _.takeRight(this.props.lineage, 2);
        let container = _.head(shortLineage).children;
        let current = _.last(shortLineage);
        let currentIndex = _.indexOf(container, current);
        let retParams = {};
        if(currentIndex === 0 && _.size(container) === 1){
            retParams.nextText = null;
        }else if(currentIndex === 0){
            retParams.nextText =  _.nth(container, currentIndex + 1).title;
            retParams.nextUrl = _.nth(container, currentIndex + 1).fullUrl;
        }else if(currentIndex === _.size(container) - 1){
            let firstItem = _.head(container);
            retParams.nextText = firstItem.title;
            retParams.nextUrl = firstItem.fullUrl;
        }else{
            retParams.nextText = _.nth(container, currentIndex + 1).title;
            retParams.nextUrl = _.nth(container, currentIndex + 1).fullUrl;
        }
        return retParams;
    }

    render(){
        let previousNextParams = this.calculateParameters();
        let nextMobileParams = this.calculateMobileParameters();
        return(
            <div id="previousNextSectionId" className={styles.previousNextContainer}>
                <div className={styles.desktop}>
                    <div className={styles.prevNextTitleContainer}>
                        {
                            previousNextParams.previousText !== null ?
                                <div className={styles.previousTitle}>
                                    <h6 className={styles.previousTitle} >Previous</h6>
                                </div>
                                :
                                <div className={styles.titleHide}>
                                    <h6 className={styles.previousTitle} >Previous</h6>
                                </div>
                        }
                        {
                            previousNextParams.nextText !== null ?
                                <div className={styles.nextTitle}>
                                    <h6 className={styles.nextTitle}>Next</h6>
                                </div>
                                :
                                null
                        }
                    </div>
                    <div className={styles.prevNextButtonsContainer}>
                        {
                            previousNextParams.previousText !== null ?
                                <div className={styles.previousContainer}>
                                    <a href={previousNextParams.previousUrl}><SmallSecondaryButton text={previousNextParams.previousText}/></a>
                                    <i className={"fa fa-chevron-left " + styles.chevronPrevious} aria-hidden="true"></i>
                                </div>
                                :
                                <div className={styles.previousContainerHide}>
                                    <SmallSecondaryButton text="Placeholder" />
                                </div>
                        }
                        {
                            previousNextParams.nextText !== null ?
                                <div className={styles.nextContainer}>
                                    <a href={previousNextParams.nextUrl}><SmallSecondaryButton text={previousNextParams.nextText}/></a>
                                    <i className={"fa fa-chevron-right " + styles.chevronNext} aria-hidden="true"></i>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
                <div className={styles.mobile}>
                    {
                        nextMobileParams.nextText !== null ?
                            <div className={styles.nextTitle}>
                                <h6 className={styles.nextTitle}>Next</h6>
                            </div>
                            :
                            null
                    }
                    {
                        nextMobileParams.nextText !== null ?
                            <div className={styles.nextContainer}>
                                <a href={nextMobileParams.nextUrl}><SmallSecondaryButton text={nextMobileParams.nextText}/></a>
                                <i className={"fa fa-chevron-right " + styles.chevronNext} aria-hidden="true"></i>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

PreviousNextSection.propTypes ={
    lineage: React.PropTypes.array.isRequired
};

PreviousNextSection.propTypes ={
    lineage: []
};

export default PreviousNextSection;