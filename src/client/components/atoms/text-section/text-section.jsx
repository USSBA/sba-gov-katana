import React from 'react'
// consider someday refactoring cheerio out and only use jquery (cheerio is a subset of jquery and we need jquery for the cross-cutting click handler)
import cheerio from 'cheerio'
import jquery from 'jquery'
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

  parseTables() {
    const $ = cheerio.load(this.props.text)
    $('table').each((i, table) => {
      const headers = []
      $(table)
        .addClass('text-section-table')
        .find('thead > tr > th')
        .each((_, theader) => {
          headers.push(theader.children[0].data)
        })

      const trs = $(table).find('tbody > tr')
      const firstRowLength = $($(trs)[0]).find('td').length

      $(trs).each((j, trow) => {
        let tds = $(trow).find('td')

        if (tds.length !== firstRowLength) {
          const prevRow = $(trs)[j - 1]
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
    $('a').each((i, anchor) => {
      if (
        anchor.attribs.href &&
        !/(https?:\/\/[a-zA-Z.0-9]+?\.gov($|(\/.*)))|^\//.test(anchor.attribs.href)
      ) {
        $(anchor).addClass('external-link-marker')
      }
    })
    return $.html()
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
    jquery('.external-link-marker')
      .off('click')
      .on('click', e => {
        console.log('Click!', e.target.href)
        _this.showModal(e.target.href)
        e.preventDefault()
      })
  }

  render() {
    return (
      <span>
        <div
          data-testid="text section"
          className={styles.textSection + (this.props.className ? ' ' + this.props.className : '')}
          dangerouslySetInnerHTML={{ __html: this.parseTables() }}
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
