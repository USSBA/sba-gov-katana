import React, { PureComponent } from 'react'
import { DecorativeDash, SmallSecondaryButton } from 'atoms'
import { Breadcrumb } from 'molecules'
import { CardCollection } from 'organisms'
import styles from './detail.scss'

class LearningCenterDetailTemplate extends PureComponent {
  render() {
    const { title, breadcrumbs } = this.props

    return (
      <div>
        <div className={styles.container + ' ' + styles.breadcrumbContainer}>
          <div className={styles.breadcrumb}>
            <Breadcrumb items={breadcrumbs} />
          </div>
        </div>
        <div className={styles.container + ' ' + styles.topContainer}>
          <h1>{title}</h1>
          <Summary {...this.props} />
          <DecorativeDash className={styles.decorativeDash} aria-hidden="true" />
        </div>
        <div className={styles.container + ' ' + styles.midContainer}>
          <TableOfContents {...this.props} />
          <DownloadFlash />
          <Course {...this.props} />
          <p>
            Course tags: <a href="#">Planning your business</a>
          </p>
          <Worksheets {...this.props} />
          <RelatedCourses {...this.props} />
          <p>SEE ALL COURSES</p>
        </div>
      </div>
    )
  }
}

LearningCenterDetailTemplate.defaultProps = {
  breadcrumbs: [
    {
      url: '#',
      title: 'Learning Center'
    },
    {
      url: '#',
      title: 'Search results'
    },
    {
      url: '#',
      title: 'How to write a business plan'
    }
  ],
  title: 'How to write a business plan',
  summary:
    'Learn the importance of business planning, the components of a business plan, and see sample plans.',
  tableOfContents: [
    {
      url: '#',
      title: 'Course'
    },
    {
      url: '#',
      title: 'Worksheets'
    }
  ],
  course: {
    url: 'https://www.youtube.com/embed/owsfdh4gxyc',
    transcript: {
      url: '#',
      summary: 'View the full text-accessible transcript for this course.'
    },
    worksheets: [
      {
        description: 'How to write a business plan checklist',
        url: '#'
      },
      {
        description: 'Balance sheet template',
        url: '#'
      },
      {
        description: 'Income statement template',
        url: '#'
      },
      {
        description: 'Cash flow statement template',
        url: '#'
      }
    ]
  },
  relatedCourses: [
    {
      type: 'card',
      image: {
        url: 'https://www.sba.gov/sites/default/files/2017-05/Loans_Counseling_and_Education_0.jpg',
        alt: 'Intro to accounting'
      },
      link: {},
      subtitleText:
        'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
      titleText: 'Intro to accounting'
    },
    {
      type: 'card',
      image: {
        url: 'https://www.sba.gov/sites/default/files/2017-05/Loans_Counseling_and_Education_0.jpg',
        alt: 'How to prepare a loan package'
      },
      link: {},
      subtitleText:
        'Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies mauris vitae quam faucibus ultricies. ',
      titleText: 'How to prepare a loan package'
    },
    {
      type: 'card',
      image: {
        url: 'https://www.sba.gov/sites/default/files/2017-05/Loans_Counseling_and_Education_0.jpg',
        alt: 'Understanding your customer'
      },
      link: {},
      subtitleText:
        'Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies mauris vitae quam faucibus ultricies. ',
      titleText: 'Understanding your customer'
    },
    {
      type: 'card',
      image: {
        url: 'https://www.sba.gov/sites/default/files/2017-05/Loans_Counseling_and_Education_0.jpg',
        alt: 'How to prepare a loan package'
      },
      link: {},
      subtitleText:
        'Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies mauris vitae quam faucibus ultricies. ',
      titleText: 'Strategic Planning'
    }
  ]
}

const Summary = props => {
  return (
    <div className="summary">
      <p className={styles.summary}>{props.summary}</p>
    </div>
  )
}

const TableOfContents = props => {
  const renderList = () => {
    const list = props.tableOfContents.map(item => {
      const { url, title } = props

      return (
        <li>
          <a href={url}>title</a>
        </li>
      )
    })

    return <ul>{list}</ul>
  }

  return (
    <div className="table-of-contents">
      <h2>Content</h2>
      {renderList()}
    </div>
  )
}

const DownloadFlash = props => {
  return (
    <div className={styles.downloadFlash + ' download-flash'}>
      <div className={styles.icon}>
        <i className="fa fa-exclamation-triangle" />
      </div>
      <p>You need to enable Flash to view this course.</p>
      <a href="#">
        <SmallSecondaryButton className={styles.button} text="Learn How" />
      </a>
    </div>
  )
}

const Course = props => {
  return (
    <div className={styles.course + ' course'}>
      <iframe src={props.course.url} frameborder="0" allowfullscreen />
      <div className={styles.transcriptBox + ' transcript-box'}>
        <h2>Course Transcript</h2>
        <p>{props.course.transcript.summary}</p>
        <a href={props.course.transcript.url}>
          <SmallSecondaryButton className={styles.button} text="View" />
        </a>
      </div>
    </div>
  )
}

const Worksheets = props => {
  const renderList = () => {
    const list = props.course.worksheets.map((item, i) => {
      const { url, description } = item

      return (
        <li key={i} className={`worksheet-${i}`}>
          <div className={styles.worksheetDescription}>
            <p>{description}</p>
          </div>
          <div className={styles.worksheetUrl}>
            <p>
              <a href={url}>Download .ext</a>
            </p>
          </div>
        </li>
      )
    })

    return <ul>{list}</ul>
  }

  return (
    <div className={styles.worksheets + ' worksheets'}>
      <h3>Course Worksheets</h3>
      {renderList()}
    </div>
  )
}

const RelatedCourses = props => {
  return (
    <div className={styles.relatedCourses + ' related-courses'}>
      <h3>Related Courses</h3>
      <CardCollection parentIndex={0} cards={props.relatedCourses} />
    </div>
  )
}

const RelatedArticles = props => {
  return <div className="related-articles">RelatedCourses</div>
}

export default LearningCenterDetailTemplate

export { Summary, TableOfContents, Course, Worksheets, RelatedCourses, RelatedArticles }
