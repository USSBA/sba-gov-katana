import React from 'react';
import styles from './title-box.scss'
import diagonalLines from '../../../../../public/assets/images/homepage/diagonal-lines.png';
import diagonalLinesMobile from '../../../../../public/assets/images/homepage/diagonal-lines-mobile.png';
import SmallSecondaryButton from "../../atoms/small-secondary-button/small-secondary-button.jsx";
import SmallInversePrimaryButton from "../../atoms/small-inverse-primary-button/small-inverse-primary-button.jsx";

class TitleBox extends React.Component {

    render() {
        return (
            <div id={"container-" + this.props.index} className={(this.props.solidBox ? styles.solidBox : styles.transparentBox)}>
                <div id={"items-container-" + this.props.index}>
                    <ul id={"title-box-ul-" + this.props.index}>
                        <li id={"section-num-" + this.props.index} className={styles.sectionNum}>{this.props.sectionNum}</li>
                        <li id={"li-hr-" + this.props.index}><hr/></li>
                        <li id={"section-title-" + this.props.index} className={styles.sectionTitle}>{this.props.title}</li>
                        <li id={"section-text-" + this.props.index} className={styles.sectionText}>{this.props.text}</li>
                        <li id={"li-button-" + this.props.index}>{this.props.solidBox ? <SmallInversePrimaryButton text={"LEARN MORE"} url={this.props.link}/> : <SmallSecondaryButton text={"LEARN MORE"} url={this.props.link}/>}</li>
                    </ul>
                    {this.props.solidBox ? <div>
                        <img id={"desktop-img-" + this.props.index} className={styles.desktopImg} src={diagonalLines} alt=""/>
                        <img id={"mobile-img-" + this.props.index} className={styles.mobileImg} src={diagonalLinesMobile} alt=""/>
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
    link: React.PropTypes.string,
    index: React.PropTypes.number
};

TitleBox.defaultProps = {
    solidBox: true,
    sectionNum: 0,
    title: "",
    text: "",
    link: "",
    index: 0
};

export default TitleBox;