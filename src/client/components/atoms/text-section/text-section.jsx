import PropTypes from 'prop-types'
import React from 'react'
import styles from './text-section.scss'

class TextSection extends React.Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      targetUrl: ''
    }
    this.handleExternalLinks = this.handleExternalLinks.bind(this)
  }

  handleExternalLinks(htmlDom) {
    htmlDom.querySelectorAll('a').forEach(anchor => {
      // Regex will check for .gov link without a path or with a path OR a relative link.
      // If none of the above cases are true then we add a target blank attribute to the link.
      const href = anchor.getAttribute('href')
      if (href && !/(https?:\/\/[a-zA-Z.0-9]+?\.gov($|(\/.*)))|^\//.test(href)) {
        anchor.setAttribute('target', '_blank')
      }
    })
  }

  parseTables(text) {
    const textSectionHtml = `${text}`

    var htmlDom = new DOMParser().parseFromString(textSectionHtml, 'text/html')

    const tables = htmlDom.querySelectorAll('table')
    if (tables.length > 0) {
      tables.forEach(table => {
        const headers = []
        table.classList.add('text-section-table')
        table.querySelectorAll('thead > tr > th').forEach(theader => {
          headers.push(theader.textContent)
        })

        const trs = table.querySelectorAll('tbody > tr')

        trs.forEach(trow => {
          const tds = trow.querySelectorAll('td')

          if (headers.length < 1) {
            tds.forEach((tdata, i) => {
              const html = '<div class="table-data">' + tdata.innerHTML + '</div>'
              tdata.classList.add('index-' + i)
              // tdata.innerHTML = html
              tds[i].innerHTML = html
            })
          } else {
            tds.forEach((tdata, i) => {
              const html = "<div class='table-data-wrapper'>" + tdata.innerHTML + '</div>'
              tds[i].innerHTML = html

              const label = "<div class='table-header-label'>" + headers[i] + ':</div>'
              tdata.insertAdjacentHTML('beforeend', label)

              // const labelFrag = document.createRange().createContextualFragment(label)
              // tdata.insertBefore(labelFrag, tdata.firstChild);
            })
          }
        })
      })
    }

    this.handleExternalLinks(htmlDom)
    return htmlDom.body.innerHTML
  }

  render() {
    const { className, text } = this.props
    return (
      <span>
        <div
          dir="auto"
          data-testid="text section"
          className={styles.textSection + (className ? ' ' + className : '')}
          dangerouslySetInnerHTML={{ __html: this.parseTables(text) }}
        />
      </span>
    )
  }
}

TextSection.propTypes = {
  // TODO: use children instead of text prop
  text: PropTypes.string.isRequired
}

export default TextSection

export { TextSection }
