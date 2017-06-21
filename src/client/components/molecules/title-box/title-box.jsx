import React from 'react';
import styles from './title-box.scss'
import diagonalLines from '../../../../../public/assets/images/homepage/diagonal-lines.png';
import diagonalLinesMobile from '../../../../../public/assets/images/homepage/diagonal-lines-mobile.png';
import SmallSecondaryButton from "../../atoms/small-secondary-button/small-secondary-button.jsx";
import SmallInversePrimaryButton from "../../atoms/small-inverse-primary-button/small-inverse-primary-button.jsx";

class TitleBox extends React.Component {

    render() {
        return (
            <div className={(this.props.solidBox ? styles.solidBox : styles.transparentBox)}>
                <div>
                        <span className={styles.sectionNum}>{this.props.sectionNum}</span>
                        <h2 className={styles.sectionTitle}>{this.props.title}</h2>
                        <p className={styles.sectionText}>{this.props.text}</p>
                        {this.props.solidBox ? <SmallInversePrimaryButton text={"LEARN MORE"} url={this.props.link}/> : <SmallSecondaryButton text={"LEARN MORE"} url={this.props.link}/>}
                    {this.props.solidBox ? <div>
                        <img className={styles.desktopImg} src={diagonalLines} alt=""/>
                        <img className={styles.mobileImg} src={diagonalLinesMobile} alt=""/>
                    </div> : ""}
                </div>
            </div>
        )
    }
}

TitleBox.propTypes = {
    solidBox: React.PropTypes.bool,
    sectionNum: React.PropTypes.number,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    link: React.PropTypes.string
};

TitleBox.defaultProps = {
    solidBox: true,
    sectionNum: 0,
    title: "",
    text: "",
    link: ""
};

export default TitleBox;
