import React from 'react'
import $ from 'jquery'
import styles from './text-section.scss'
import { LeaveSbaModal } from 'organisms'

class TextSection extends React.Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      targetUrl: ''
    }
  }

  parseTables(text) {
    const textSectionHtml = $(`<div>${text}</div>`)

    textSectionHtml.find('table').each((i, table) => {
      const headers = []
      $(table)
        .addClass('text-section-table')
        .find('thead > tr > th')
        .each((j, theader) => {
          headers.push($(theader).text())
        })

      const trs = $(table).find('tbody > tr')
      const firstRowLength = $($(trs)[0]).find('td').length

      $(trs).each((k, trow) => {
        let tds = $(trow).find('td')

        if (tds.length !== firstRowLength) {
          const prevRow = $(trs)[k - 1]
          const firstTdCopy = $($(prevRow).find('td')[0]).clone()
          firstTdCopy.removeAttr('rowspan')
          firstTdCopy.find('.table-header-label').remove()
          const cellHtml = firstTdCopy.find('.table-data-wrapper').html()
          firstTdCopy
            .find('.table-data-wrapper')
            .parent()
            .html(cellHtml)
          firstTdCopy.addClass('show-mobile')
          $(trow).prepend($(firstTdCopy))
        }

        tds = $(trow).find('td')

        if (headers.length < 1) {
          tds.each((index, tdata) => {
            const html = '<div class="table-data">' + $(tdata).html() + '</div>'
            $(tdata)
              .html(html)
              .addClass('index-' + index)
          })
        } else {
          tds.each((index, tdata) => {
            const html = "<div class='table-data-wrapper'>" + $(tdata).html() + '</div>'
            $(tdata).html(html)

            const label = "<div class='table-header-label'>" + headers[index] + ':</div>'
            $(tdata).prepend(label)
          })
        }
      })
    })

    // TODO: Consider abstracting out this section of code into it's own function
    textSectionHtml.find('a').each((i, anchor) => {
      // Regex will check for .gov link without a path or with a path OR a relative link.
      // If none of the above cases are true then we add an external-link-marker class to the link.
      const href = $(anchor).attr('href')
      if (href && !/(https?:\/\/[a-zA-Z.0-9]+?\.gov($|(\/.*)))|^\//.test(href)) {
        $(anchor).addClass('external-link-marker')
      }
    })

    return textSectionHtml.html()
  }

  showModal(targetUrl) {
    this.setState({
      modalIsOpen: true,
      targetUrl
    })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  componentDidMount() {
    const _this = this
    $('.external-link-marker')
      .off('click')
      .on('click', e => {
        console.log('Click!', e.target.href)
        _this.showModal(e.target.href)
        e.preventDefault()
      })
  }

  render() {
    const { className, text } = this.props
    return (
      <span>
        <div
          data-testid="text section"
          className={styles.textSection + (className ? ' ' + className : '')}
          dangerouslySetInnerHTML={{ __html: this.parseTables(text) }}
        />
        <LeaveSbaModal
          url={this.state.targetUrl}
          isOpen={this.state.modalIsOpen}
          closeLeaveSba={this.closeModal.bind(this)}
        />
      </span>
    )
  }
}

TextSection.propTypes = {
  // TODO: use children instead of text prop
  text: React.PropTypes.string.isRequired
}

export default TextSection

export { TextSection }
