import React, { PropTypes } from 'react'
import styles from './link-card.scss'

import { Link } from 'atoms'

const LinkCard = ({ link, title }) => (
  <div className={`link-card ${styles.linkCard}`}>
    {link && <Link to={link}>{title}</Link>}
    {link && <p>{link}</p>}
  </div>
)

LinkCard.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string
}

export default LinkCard
