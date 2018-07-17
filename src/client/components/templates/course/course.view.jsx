import React, { PureComponent } from 'react'
import isMobile from 'ismobilejs'
import { isEmpty } from 'lodash'

import CourseContent from './course-content'
import styles from './course.view.scss'
import { Button, DecorativeDash } from 'atoms'
import { Breadcrumb, CallToAction, ReadMore } from 'molecules'
import { CardCollection } from 'organisms'

class CourseView extends PureComponent {
  constructor() {
    super()

    this.state = {
      readMoreExpanded: false
    }
  }

  handleReadMoreStatus(readMoreStatus) {
    this.setState({ readMoreExpanded: readMoreStatus })
  }

  render() {
    const {
      breadcrumbs,
      course,
      description,
      isLoaded,
      relatedCourses,
      relatedArticles,
      tags,
      title
    } = this.props

    return (
      <div>
        {isLoaded ? (
          <div>
            {breadcrumbs && (
              <div>
                <div className={styles.container + ' ' + styles.breadcrumbContainer}>
                  <div className={styles.breadcrumb}>
                    <Breadcrumb items={breadcrumbs} />
                  </div>
                </div>
              </div>
            )}
            {title && (
              <div>
                <div className={styles.container + ' ' + styles.topContainer}>
                  <h1>{title}</h1>
                  {description && <Description {...this.props} />}
                  <DecorativeDash aria-hidden="true" width={4.444} />
                </div>
              </div>
            )}
            <div className={styles.container + ' ' + styles.midContainer}>
              <TableOfContents />
              <DownloadFlash />
              <CourseContent
                {...this.props}
                onToggleStatus={this.handleReadMoreStatus.bind(this)}
                readMoreExpanded={this.state.readMoreExpanded}
              />
              {tags && <Tagcloud {...this.props} />}
              {course.worksheets && course.worksheets.length ? <Worksheets {...this.props} /> : ''}
              {!isEmpty(relatedCourses) && <RelatedCourses {...this.props} />}
              {!isEmpty(relatedArticles) && <RelatedArticles {...this.props} />}
              <CTA {...this.props} />
            </div>
          </div>
        ) : (
          <div className={styles.container + ' ' + styles.midContainer}>
            <p>loading...</p>
          </div>
        )}
      </div>
    )
  }
}

const Description = props => {
  return (
    <div className="description">
      <p className={styles.description} dangerouslySetInnerHTML={{ __html: props.description }} />
    </div>
  )
}

const TableOfContents = props => {
  return (
    <div className="table-of-contents">
      <h3 id="contentLabel">Content</h3>
      <ul role="menu" aria-labelledby="contentLabel">
        <li role="menuitem">
          <a href="#course-content">Course</a>
        </li>
        <li role="menuitem">
          <a href="#worksheets">Worksheets</a>
        </li>
      </ul>
    </div>
  )
}

const DownloadFlash = props => {
  if (!isMobile.any) {
    return (
      <div className={styles.downloadFlash + ' download-flash'}>
        <div className={styles.icon}>
          <i className="fa fa-info-circle" />
        </div>
        <p>
          This course uses Adobe Flash. Please make sure you have it installed and enabled before beginning.
        </p>
        <Button secondary small target="_blank" url="https://get.adobe.com/flashplayer/">
          Install Flash
        </Button>
      </div>
    )
  }

  return null
}

const Tagcloud = props => {
  const renderTags = () => {
    const { length } = props.tags

    const tags = props.tags.map((item, i) => {
      const { url, description } = item
      let result = (
        <a key={i} href={url}>
          {description}
        </a>
      )
      if (i < props.tags.length - 1) {
        result = <span key={i}>{result}, </span>
      }

      return result
    })

    return <span>{tags}</span>
  }

  return (
    <div className={styles.tagcloud + ' tagcloud'}>
      <p>
        <strong>Course tags:</strong> {renderTags()}
      </p>
    </div>
  )
}

const Worksheets = props => {
  const renderList = () => {
    const list = props.course.worksheets.map((item, i) => {
      const { url, description } = item
      const ext = url.split('.').pop()

      return (
        <li role="menuitem" key={i} className={`worksheet-${i}`}>
          <div className={styles.worksheetDescription}>
            <p>{description}</p>
          </div>
          <div className={styles.worksheetUrl}>
            <p>
              <a href={url} download>
                Download <span className={styles.ext}>.{ext}</span>
              </a>
            </p>
          </div>
        </li>
      )
    })

    return (
      <ul role="menu" aria-labelledby="courseWorksheetsLabel">
        {list}
      </ul>
    )
  }

  return (
    <div id="worksheets" className={styles.worksheets + ' worksheets'}>
      <h3 id="courseWorksheetsLabel">Course Worksheets</h3>
      {renderList()}
    </div>
  )
}

const RelatedCourses = props => {
  return (
    <div className={styles.relatedCourses + ' related-courses'}>
      <h3>Related Courses</h3>
      <CardCollection parentIndex={0} cards={props.relatedCourses} />
      <div className={styles.button}>
        <Button secondary url="/course/">
          See all courses
        </Button>
      </div>
    </div>
  )
}

const RelatedArticles = props => {
  return (
    <div className={styles.relatedArticles + ' related-articles'}>
      <h3>Related Articles</h3>
      <CardCollection parentIndex={0} cards={props.relatedArticles} />
    </div>
  )
}

const CTA = props => {
  let buttonAction = {
    link: {
      title: 'Find Counselors',
      url: '/tools/local-assistance'
    }
  }
  let image = {
    url: '/assets/images/learning-center/woman-man-chatting.png',
    alt: 'woman chatting with man'
  }
  return (
    <CallToAction
      size="large"
      headline="Need help? Get free business counseling."
      blurb="Get advice from partner organizations like SCORE mentors, Small Business Development Centers, and Women’s Business Centers."
      buttonAction={buttonAction}
      image={image}
    />
  )
}

CourseView.propTypes = {
  breadcrumbs: React.PropTypes.arrayOf(React.PropTypes.object),
  title: React.PropTypes.string,
  summary: React.PropTypes.string,
  course: React.PropTypes.object,
  readMoreSectionItem: React.PropTypes.object,
  tags: React.PropTypes.arrayOf(React.PropTypes.object),
  relatedCourses: React.PropTypes.arrayOf(React.PropTypes.object),
  relatedArticles: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default CourseView

export {
  Description,
  TableOfContents,
  DownloadFlash,
  Tagcloud,
  Worksheets,
  RelatedCourses,
  RelatedArticles,
  CTA
}
