import React from "react"
import styles from "./text-section.scss";
import cheerio from "cheerio";




class TextSection extends React.Component{
	parseTables() {
		const $ = cheerio.load(this.props.text)
		$('table').each((i, table) => {
			let headers = []
			$(table).find('thead > tr > th').each((i, theader) => {
				headers.push(theader.children[0].data)
			})
			$(table).find('tbody > tr').each((i, trow) => {
				$(trow).find('td').each((i, tdata) => {
					let wrapper = "<div class='table-data-wrapper'></div>"
					$(tdata).contents().wrap(wrapper)

					let label = "<div class='table-header-label'>" + headers[i] +":</div>"
					$(tdata).prepend(label)
				})
			})
		})
		return $.html()
	}

  render(){
    return (<div className={styles.textSection} dangerouslySetInnerHTML={{__html: this.parseTables()}}/>);
  }
}

TextSection.propTypes ={
    text: React.PropTypes.string.isRequired
}

export default TextSection;
