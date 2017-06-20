import React from 'react';
import styles from './ten-steps-section.scss'

class TenStepsSection extends React.Component {

    render() {
        return (
            <div className={styles.Container}>
                <img className={styles.Banner} src={this.props.image} alt={this.props.imageAlt}/>
                <TitleBox/>
            </div>
        )
    }
}

TenStepsSection.propTypes = {
    leftAlignBox: React.PropTypes.bool,
    solidBox: React.PropTypes.bool,
    index: React.PropTypes.number,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    link: React.PropTypes.string,
    image: React.PropTypes.string,
    imageAlt: React.PropTypes.string
};

TenStepsSection.defaultProps = {
    leftAlignBox: true,
    solidBox: true,
    index: 0,
    title: "",
    text: "",
    link: "",
    image: "",
    imageAlt: ""
};

export default TenStepsSection;