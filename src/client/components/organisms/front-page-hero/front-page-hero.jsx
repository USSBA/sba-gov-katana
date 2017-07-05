import React from 'react';
import styles from './front-page-hero.scss'
import diagonalLines from '../../../../../public/assets/images/homepage/diagonal-lines.png';

class FrontPageHero extends React.Component {

  render() {
    return (
      <div className={styles.container + " " + styles[this.props.color] + " " + (this.props.reverse
        ? styles.reverse
        : "")}>
        <div className={styles.titleContainer}>
            <p className={styles.title}>{this.props.title}</p>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.Banner} src={this.props.image} alt={this.props.imageAlt}/>
        </div>
        <div className={styles.boxContainer}>
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
            <img src={diagonalLines} alt=""/>
          </div>
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
