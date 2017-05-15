import React from 'react';
import styles from './front-page-hero.scss'
import diagonalLines from '../../../../../public/assets/images/homepage/diagonal-lines.png';
import diagonalLinesMobile from '../../../../../public/assets/images/homepage/diagonal-lines-mobile.png';

class FrontPageHero extends React.Component {

  render() {
    return (
      <div className={styles.Container + " " + styles[this.props.color] + " " +(this.props.reverse ? styles.reverse : "")}>
        <p>{this.props.title}</p>
        <img className={styles.Banner} src={this.props.image} alt={this.props.imageAlt}/>
        <div className={styles.AccentBox}>
          <ul>
            <a href={this.props.links[0].link}>
              <li className={styles.borderBox}>{this.props.links[0].title}</li>
            </a>
            <a href={this.props.links[1].link}>
              <li className={styles.borderBox}>{this.props.links[1].title}</li>
            </a>
            <a href={this.props.links[2].link}>
              <li>{this.props.links[2].title}</li>
            </a>
          </ul>
          <img className="hidden-xs" src={diagonalLines} alt=""/>
          <img className="visible-xs" src={diagonalLinesMobile} alt=""/>
        </div>
      </div>
    )
  }
}

FrontPageHero.propTypes = {
    title: React.PropTypes.string,
    image: React.PropTypes.string,
    imageAlt: React.PropTypes.string,
    links: React.PropTypes.array,
    color: React.PropTypes.string
}

export default FrontPageHero;
