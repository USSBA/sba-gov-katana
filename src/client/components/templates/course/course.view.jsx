import React, { PureComponent } from 'react'
import { DecorativeDash, LargeSecondaryButton, SmallSecondaryButton } from 'atoms'
import { Breadcrumb, CallToAction, ReadMore } from 'molecules'
import { CardCollection } from 'organisms'
import styles from './course.view.scss'

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
    const { title, breadcrumbs } = this.props

    return (
      <div>
        {this.props.breadcrumbs && (
          <div>
            <div className={styles.container + ' ' + styles.breadcrumbContainer}>
              <div className={styles.breadcrumb}>
                <Breadcrumb items={breadcrumbs} />
              </div>
            </div>
          </div>
        )}
        {this.props.title && (
          <div>
            <div className={styles.container + ' ' + styles.topContainer}>
              <h1>{title}</h1>
              {this.props.summary && <Summary {...this.props} />}
              <DecorativeDash className={styles.decorativeDash} aria-hidden="true" />
            </div>
          </div>
        )}
        <div className={styles.container + ' ' + styles.midContainer}>
          <TableOfContents />
          <DownloadFlash />
          <Course
            {...this.props}
            onToggleStatus={this.handleReadMoreStatus.bind(this)}
            readMoreExpanded={this.state.readMoreExpanded}
          />
          {this.props.tags && <Tagcloud {...this.props} />}
          {this.props.course.worksheets && <Worksheets {...this.props} />}
          <RelatedCourses {...this.props} />
          <RelatedArticles {...this.props} />
          <CTA {...this.props} />
        </div>
      </div>
    )
  }
}

const Summary = props => {
  return (
    <div className="summary">
      <p className={styles.summary}>{props.summary}</p>
    </div>
  )
}

const TableOfContents = props => {
  return (
    <div className="table-of-contents">
      <h2>Content</h2>
      <ul>
        <li>
          <a href="#course">Course</a>
        </li>
        <li>
          <a href="#worksheets">Worksheets</a>
        </li>
      </ul>
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
      <a href="https://get.adobe.com/flashplayer/" target="_blank">
        <SmallSecondaryButton className={styles.button} text="Learn How" />
      </a>
    </div>
  )
}

const Course = props => {
  return (
    <div id="course" className={styles.course + ' course'}>
      <iframe src={props.course.url} frameborder="0" allowfullscreen />
      <div className={styles.transcriptBox + ' transcript-box'}>
        <ReadMore
          parentId={10000}
          onToggleStatus={props.onToggleStatus}
          expanded={props.readMoreExpanded}
          readMoreSectionItem={props.readMoreSectionItem}
          isHTML={true}
        />
      </div>
    </div>
  )
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
        <li key={i} className={`worksheet-${i}`}>
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

    return <ul>{list}</ul>
  }

  return (
    <div id="worksheets" className={styles.worksheets + ' worksheets'}>
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
      <a href="/course/">
        <LargeSecondaryButton className={styles.button} text="See All Courses" />
      </a>
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
  return (
    <CallToAction
      size="large"
      btnUrl="#"
      btnTitle="Find Counselors"
      image="/assets/images/learning-center/woman-man-chatting.png"
      imageAlt="woman chatting with man"
      headline="Need help? Get free business counseling."
      blurb="Get advice from partner organizations like SCORE mentors, Small Business Development Centers, and Women’s Business Centers."
    />
  )
}

CourseView.defaultProps = {
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
  course: {
    url: 'https://www.youtube.com/embed/owsfdh4gxyc',
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
  readMoreSectionItem: {
    expandedCopyText: 'expanded text',
    titleText: 'title text',
    preview: 'preview text'
  },
  tags: [
    {
      description: 'Planning your business',
      url: '#'
    },
    {
      description: 'Planning your estate',
      url: '#'
    }
  ],
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
  ],
  relatedArticles: [
    {
      type: 'card',
      link: {
        url: '#',
        title: 'Read More'
      },
      subtitleText:
        'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
      titleText: 'Write your business plan'
    },
    {
      type: 'card',
      link: {
        url: '#',
        title: 'Read More'
      },
      subtitleText:
        'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
      titleText: 'Calculate your startup costs'
    },
    {
      type: 'card',
      link: {
        url: '#',
        title: 'Read More'
      },
      subtitleText:
        'Learn the importance of business planning, the components of a business plan, and see sample plans and resources.',
      titleText: 'Market research and competitive analysis'
    }
  ]
}

export default CourseView

export { Summary, TableOfContents, Course, Tagcloud, Worksheets, RelatedCourses, RelatedArticles, CTA }
