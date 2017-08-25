import React from "react";
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
				
				const tds = $(trow).find("td");

				tds.each((index, tdata) => {
						
					const html = "<div class='table-data-wrapper'>" + $(tdata).html() + "</div>";
					$(tdata).html(html);


					const label = "<div class='table-header-label'>" + headers[index] + ":</div>";
					$(tdata).prepend(label);

				});
			})
		})
		return $.html()
	}

  render(){
    return (<div className={styles.textSection  + (this.props.className ? " " +this.props.className: "")} dangerouslySetInnerHTML={{__html: this.parseTables()}}/>);
  }
}

TextSection.propTypes = {
    text: React.PropTypes.string.isRequired
}

export default TextSection;
