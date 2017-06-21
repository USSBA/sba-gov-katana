import React from 'react';
import styles from './ten-steps-section.scss';
import TitleBox from "../title-box/title-box.jsx";

class TenStepsSection extends React.Component {

    render() {
        return (
            <div className={styles.Container}>
                <img className={styles.Banner} src={this.props.sectionItem.image} alt={this.props.sectionItem.imageAlt}/>
                <TitleBox solidBox={this.props.sectionItem.solidBox} sectionNum={this.props.sectionItem.sectionNum} title={this.props.sectionItem.title} text={this.props.sectionItem.text} link={this.props.sectionItem.link} />
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