import React, { Component } from 'react'
import Waypoint from 'react-waypoint'
import sectionNavStyles from '../section-nav/section-nav.scss'
import basicPageStyles from '../../templates/basic-page/basic-page.scss'

const DistrictOfficeSectionNav = ({
  officeId,
  pageConnectorId,
  subPageId,
  title,
  data,
  position,
  onTopEnter,
  backLinkText
}) => {
  const stickyFunctionTop = () => {
    return position === 'middle' ? sectionNavStyles.stickyTop : null
  }
  const stickyFunctionBottom = () => {
    return position === 'bottom' ? sectionNavStyles.stickyBottom : null
  }
  const makeNavLinks = (_data, id) => {
    const result = _data.map(function(item, index) {
      const currentLinkClass = String(id) === String(item.id) ? sectionNavStyles.currentNavLink : ''
      return (
        <li className={currentLinkClass} key={index}>
          <a
            className="article-navigation-article-link-desktop"
            id={'desktop-article-link-' + index}
            href={`/offices/district/${officeId}/${pageConnectorId}/${item.id}`}
          >
            {item.title}
          </a>
        </li>
      )
    })
    return result
  }
  const navLinks = makeNavLinks(data, subPageId)
  return (
    <div>
      <div className={`basicpage-backlinkmobile ${basicPageStyles.backLinkMobile}`}>
        <a id="backToallTopicsMobile" href={`/offices/district/${officeId}/`}>
          {backLinkText}
        </a>
      </div>
      <div
        id="article-navigation-desktop"
        className={sectionNavStyles.sectionNav + ' ' + stickyFunctionTop() + ' ' + stickyFunctionBottom()}
      >
        <Waypoint topOffset="30px" onEnter={onTopEnter} />
        <a
          id="article-navigation-back-button-desktop"
          className={sectionNavStyles.backLink}
          href={`/offices/district/${officeId}/`}
        >
          {backLinkText}
        </a>
        <span id="article-navigation-title-desktop">
          <h3>{title}</h3>
        </span>
        <ul>{navLinks}</ul>
      </div>
    </div>
  )
}

export default DistrictOfficeSectionNav
