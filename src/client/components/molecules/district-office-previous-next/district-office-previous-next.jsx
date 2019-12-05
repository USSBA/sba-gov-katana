import React, { Component } from 'react'
import previousNextSectionStyles from '../previous-next/previous-next.scss'

const DistrictOfficePreviousNextSection = ({ data, currentPage, officeId, pageConnectorId }) => {
  const previousArticle = ((pages, _currentPage) => {
    let result
    for (let i = 0; i < pages.length; i++) {
      if (i > 0 && pages[i] === _currentPage) {
        result = pages[i - 1]
        break
      }
    }
    return result
  })(data, currentPage)

  const nextArticle = ((pages, _currentPage) => {
    let result
    for (let i = 0; i < pages.length; i++) {
      if (i < pages.length && pages[i] === _currentPage) {
        result = pages[i + 1]
        break
      }
    }
    return result
  })(data, currentPage)

  return (
    <div className={previousNextSectionStyles.previousNext} id="previous-next">
      <div
        className={`${previousNextSectionStyles.previous} ${!previousArticle &&
          previousNextSectionStyles.invisible}`}
      >
        <h6>Previous</h6>
        {previousArticle && (
          <a
            className={previousNextSectionStyles.button}
            href={`/offices/district/${officeId}/${pageConnectorId}/${previousArticle.id}`}
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
            <span>{previousArticle.title}</span>
          </a>
        )}
      </div>
      <div
        className={`${previousNextSectionStyles.next} ${!nextArticle &&
          previousNextSectionStyles.invisible}`}
      >
        <h6>Next</h6>
        {nextArticle && (
          <a
            className={previousNextSectionStyles.button}
            href={`/offices/district/${officeId}/${pageConnectorId}/${nextArticle.id}`}
          >
            <span>{nextArticle.title}</span>
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}

export default DistrictOfficePreviousNextSection
