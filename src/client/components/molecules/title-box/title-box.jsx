import React from 'react';
import styles from './title-box.scss'
import diagonalLines from '../../../../../public/assets/images/homepage/diagonal-lines.png';
import diagonalLinesMobile from '../../../../../public/assets/images/homepage/diagonal-lines-mobile.png';

class TitleBox extends React.Component {

    render() {
        return (
            <div className={styles.Container}>
                <div>
                    <ul>
                        <li className={styles.borderBox}>{this.props.index}</li>
                        <li><hr/></li>
                        <li className={styles.borderBox}>{this.props.title}</li>
                        <li className={styles.borderBox}>{this.props.text}</li>
                        <li><a>Button</a></li>
                    </ul>
                    <img className="hidden-xs" src={diagonalLines} alt=""/>
                    <img className="visible-xs" src={diagonalLinesMobile} alt=""/>
                </div>
            </div>
        )
    }
}

TitleBox.propTypes = {
    solid: React.PropTypes.bool,
    index: React.PropTypes.number,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    link: React.PropTypes.string
};

TitleBox.defaultProps = {
    solid: true,
    index: 0,
    title: "",
    text: "",
    link: ""
};

export default TitleBoxFilled;