import React from 'react'

import styles from './front-page-hero.scss'
import diagonalLines from 'assets/images/homepage/diagonal-lines.png'
import { BasicLink } from 'atoms'
import { eventCategories } from '../../../services/constants'

class FrontPageHero extends React.Component {
  render() {
    const { links } = this.props
    return (
      <div
        className={
          styles.container +
          ' ' +
          styles[this.props.color] +
          ' ' +
          (this.props.reverse ? styles.reverse : '')
        }
      >
        <div className={styles.titleContainer}>
          <p className={styles.title}>{this.props.title}</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.Banner}
            src={this.props.image}
            alt={this.props.imageAlt}
          />
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.AccentBox}>
            <ul>
              {links.map(({ link, title }, index) => (
                <BasicLink
                  eventConfig={{
                    category: [
                      eventCategories.frontPage,
                      'Non-Featured-Hero'
                    ].join('-'),
                    action: `Click: ${title}`
                  }}
                  key={index}
                  url={link}
                >
                  <li className={styles.borderBox}>{title}</li>
                </BasicLink>
              ))}
            </ul>
            <img src={diagonalLines} alt="" />
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

export default FrontPageHero
