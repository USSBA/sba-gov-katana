import React from "react"
import styles from "./previous-next.scss";
import SmallSecondaryButton from "../../atoms/small-secondary-button/small-secondary-button.jsx";

class PreviousNextSection extends React.Component{
    getNextSection(currentIndexInParent, parent){
        let retObj = {};
        let nextSectionIndex = currentIndexInParent + 1;
        if(nextSectionIndex === _.size(parent)){
            retObj.nextText = null;
            retObj.nextUrl = null;
        }else{
            let nextSection = _.nth(parent, nextSectionIndex).children;
            if(nextSection){
                let sectionFirstItem = _.head(nextSection);
                retObj.nextText = sectionFirstItem.title;
                retObj.nextUrl = sectionFirstItem.fullUrl;
            }else{
                retObj.nextText = null;
                retObj.nextUrl = null;
            }
        }
        return retObj;
    }

    getPreviousSection(currentIndexInParent, parent){
        let retObj = {};
        let prevSectionIndex = currentIndexInParent - 1;
        if(Math.sign(prevSectionIndex) === -1){
            retObj.previousText = null;
            retObj.previousUrl = null;
        }else{
            let prevSection = _.nth(parent, prevSectionIndex).children;
            if(prevSection){
                let sectionLastItem = _.last(prevSection);
                retObj.previousText = sectionLastItem.title;
                retObj.previousUrl = sectionLastItem.fullUrl;
            }else{
                retObj.previousText = null;
                retObj.previousUrl = null;
            }
        }
        return retObj;
    }

    calculateDesktopParameters() {
        let parent = _.head(this.props.lineage).children;
        let shortLineage = _.takeRight(this.props.lineage, 2);
        let section = _.head(shortLineage).children;
        let currentIndexInParent = _.indexOf(parent, _.head(shortLineage));
        let current = _.last(shortLineage);
        let currentIndexInSection = _.indexOf(section, current);
        let retObj = {};
        if(currentIndexInSection === 0 && _.size(section) === 1){
            let nextSection = this.getNextSection(currentIndexInParent, parent);
            let prevSection = this.getPreviousSection(currentIndexInParent, parent);
            retObj.previousText = prevSection.previousText;
            retObj.previousUrl = prevSection.previousUrl;
            retObj.nextText = nextSection.nextText;
            retObj.nextUrl = nextSection.nextUrl;

        }else if(currentIndexInSection === 0){
            let prevSection = this.getPreviousSection(currentIndexInParent, parent);
            retObj.previousText = prevSection.previousText;
            retObj.previousUrl = prevSection.previousUrl;
            retObj.nextText =  _.nth(section, currentIndexInSection + 1).title;
            retObj.nextUrl = _.nth(section, currentIndexInSection + 1).fullUrl;
        }else if(currentIndexInSection === _.size(section) - 1){
            retObj.previousText = _.nth(section, currentIndexInSection - 1).title;
            retObj.previousUrl = _.nth(section, currentIndexInSection - 1).fullUrl;
            let nextSection = this.getNextSection(currentIndexInParent, parent);
            retObj.nextText = nextSection.nextText;
            retObj.nextUrl = nextSection.nextUrl;
        }else{
            retObj.previousText = _.nth(section, currentIndexInSection - 1).title;
            retObj.previousUrl = _.nth(section, currentIndexInSection - 1).fullUrl;
            retObj.nextText = _.nth(section, currentIndexInSection + 1).title;
            retObj.nextUrl = _.nth(section, currentIndexInSection + 1).fullUrl;
        }
        return retObj;
    }

    calculateMobileParameters() {
        let parent = _.head(this.props.lineage).children;
        let shortLineage = _.takeRight(this.props.lineage, 2);
        let section = _.head(shortLineage).children;
        let currentIndexInParent = _.indexOf(parent, _.head(shortLineage));
        let current = _.last(shortLineage);
        let currentIndexInSection = _.indexOf(section, current);
        let retObj = {};
        if(currentIndexInSection === 0 && _.size(section) === 1){
            let nextSection = this.getNextSection(currentIndexInParent, parent);
            retObj.nextText = nextSection.nextText;
            retObj.nextUrl = nextSection.nextUrl;

        }else if(currentIndexInSection === 0){
            retObj.nextText =  _.nth(section, currentIndexInSection + 1).title;
            retObj.nextUrl = _.nth(section, currentIndexInSection + 1).fullUrl;
        }else if(currentIndexInSection === _.size(section) - 1){
            let nextSection = this.getNextSection(currentIndexInParent, parent);
            retObj.nextText = nextSection.nextText;
            retObj.nextUrl = nextSection.nextUrl;
        }else{
            retObj.nextText = _.nth(section, currentIndexInSection + 1).title;
            retObj.nextUrl = _.nth(section, currentIndexInSection + 1).fullUrl;
        }
        return retObj;
    }

    render(){
        let previousNextParams = this.calculateDesktopParameters();
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