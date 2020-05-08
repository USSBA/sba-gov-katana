import React, { Component } from 'react'
import { Button } from  'atoms'
import PropTypes from 'prop-types'
import styles from './file-uploader.scss'
import Dropzone from 'react-dropzone'
import { isEmpty } from 'lodash'

class FileUploader extends Component {
	constructor(props) {
		super(props)
		this.state = {
			files: []
		}
	}
	convertToListData(arr) {
		return arr.map( ({ name }) => {
			return (
				<div key={name} className={styles.file}>
					{name}
					<Button secondary onClick={ e => {
						e.preventDefault()
						this.removeFileFromList(name)
					}}>Remove this file</Button>
				</div>
			)
		})
	}
	removeFileFromList(filename) {
		const { onChange } = this.props
		const { files } = this.state
		const filteredFiles = files.filter( file => file.name !== filename )
		const list = this.convertToListData(filteredFiles)
		this.setState( { files: filteredFiles, list }, () => {
			onChange({ files: filteredFiles })
		})
	}
	onDrop(acceptedFiles) {
		const { onChange } = this.props
		const list = this.convertToListData(acceptedFiles)
		this.setState({ files: acceptedFiles, list }, () => {
			onChange({ files: acceptedFiles })
		})
	}
	render() {
		const { list } = this.state
		const { label } = this.props
		return (
			<div className={styles.fileUploader}>
	 			<label tabIndex="0" for="dropzone-files" className={styles.label}>{label}</label>
	 		    <Dropzone accept='application/pdf, application/msword' onDrop={ acceptedFiles => this.onDrop(acceptedFiles) }>
				  {({getRootProps, getInputProps}) => (
				    <section>
				      <div {...getRootProps()}>
				        <input id="dropzone-files" {...getInputProps()} />
		 		        <div className={styles.dropzone}>
		 		        	<p>Drag 'n' drop some files here, or click to select files</p>
		 		        </div>
				      </div>
				    </section>
				  )}
				</Dropzone>
	 		    {(!isEmpty(list) && <div className={styles.sortableList}>{list}</div>)}
			</div>
		)
	}
}
FileUploader.propTypes = {
  label: PropTypes.string,
  onDrop: PropTypes.func,
  onChange: PropTypes.func
}
FileUploader.defaultProps = {
  label: 'add label',
  onDrop: () => {},
  onChange: () => {}
}
export default FileUploader