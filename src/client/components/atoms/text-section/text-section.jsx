import React from 'react'
import cheerio from 'cheerio'

import styles from './text-section.scss'

class TextSection extends React.Component {
  parseTables() {
    const $ = cheerio.load(this.props.text)
    $('table').each((i, table) => {
      let headers = []
      $(table)
        .find('thead > tr > th')
        .each((i, theader) => {
          headers.push(theader.children[0].data)
        })

      const trs = $(table).find('tbody > tr')
      const firstRowLength = $($(trs)[0]).find('td').length

      $(trs).each((i, trow) => {
        let tds = $(trow).find('td')

        if (tds.length !== firstRowLength) {
          const prevRow = $(trs)[i - 1]
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

        tds.each((index, tdata) => {
          const html = "<div class='table-data-wrapper'>" + $(tdata).html() + '</div>'
          $(tdata).html(html)

          const label = "<div class='table-header-label'>" + headers[index] + ':</div>'
          $(tdata).prepend(label)
        })
      })
    })
    return $.html()
  }

  render() {
    return (
      <div
        className={styles.textSection + (this.props.className ? ' ' + this.props.className : '')}
        dangerouslySetInnerHTML={{ __html: this.parseTables() }}
      />
    )
  }
}

TextSection.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default TextSection

export { TextSection }
