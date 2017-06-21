import React from 'react';
import styles from './ten-steps-section.scss';
import TitleBox from "../title-box/title-box.jsx";

class TenStepsSection extends React.Component {
    calculateSectionStyle(){
        if(this.props.sectionItem.leftAlignBox){
            return this.props.sectionItem.solidBox ? styles.leftAlignedSolidBoxSection : styles.leftAlignedBoxSection;
        }else {
            return this.props.sectionItem.solidBox ? styles.rightAlignedSolidBoxSection : styles.rightAlignedBoxSection;
        }
    }

    render() {
        let sectionStyle = this.calculateSectionStyle();
        return (
            <div className={sectionStyle}>
                <img className={styles.Banner} src={this.props.sectionItem.image} alt={this.props.sectionItem.imageAlt}/>
                <div className={styles.titleBox}><TitleBox solidBox={this.props.sectionItem.solidBox} sectionNum={this.props.sectionItem.sectionNum} title={this.props.sectionItem.title} text={this.props.sectionItem.text} link={this.props.sectionItem.link} /></div>
            </div>
        )
    }
}

TenStepsSection.propTypes = {
    sectionItem: React.PropTypes.object
};

TenStepsSection.defaultProps = {
    sectionItem: {}
};

export default TenStepsSection;