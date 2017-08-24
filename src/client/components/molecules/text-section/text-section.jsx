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
					
					/*
						
						since the last row of content is a body of link tags
						with comma separators,
						place a space after each comma so that the links have space
						after it's preceding comma
						ie:

						change
						<a href="#">Link 1</a>,<a href="#">Link 2</a>
						(no space after comma ",")

						to 
						<a href="#">Link 1</a>, <a href="#">Link 2</a>
						(has space after comma ", ")

					*/

					if (index === tds.length - 1) {
						
						const html = $(tdata).html().replace(new RegExp(",", "g"), ", ");
						$(tdata).html(html);

					} else {
						
						const wrapper = "<div class='table-data-wrapper'></div>";
						$(tdata).contents().wrap(wrapper);

					}

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
