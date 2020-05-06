import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './file-uploader.scss'
import { useDropzone } from 'react-dropzone'
import { isEmpty } from 'lodash'

const FileUploader = ({ label, defaultValue, onChange }) => {

	const [files, setFiles] = useState([])

	const { getRootProps, getInputProps } = useDropzone({
		//accept: 'image/*',
		onDrop: acceptedFiles => {
			setFiles(acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})))
			onChange({
				files: acceptedFiles//,
				//shouldUploadImageData: true
			})
		}
	})

	const list = files.map(file => ({ content: <div key={file.name} className={styles.file}><img src={file.preview} alt="" /></div> }))

	useEffect(() => () => {
		// Make sure to revoke the data uris to avoid memory leaks
		files.forEach(file => URL.revokeObjectURL(file.preview))
	},
	[files])

	let defaultList = []
	if (isEmpty(list)) {
		defaultList = defaultValue.map( ({ key, publicURL }, i) => {
			return { content: <div key={key} className={styles.file}><img src={publicURL} alt="" /></div> }
		})
	}

	const onSort = (sortedList, shouldUploadImageData = false) => {
		onChange({
			files,
			keyOrder: sortedList.map ( item => item.content.key )//,
			//shouldUploadImageData
		})
	}

	return (
		<div>
			<div className={styles.label}>{label}</div>
			<div {...getRootProps()}>
		        <input {...getInputProps()} />
		        <div className={styles.dropzone}>
		        	<p>Drag 'n' drop some files here, or click to select files</p>
		        </div>
		    </div>
		    {!isEmpty(list) && <div>{list.map( item => item.content )}</div>}
		    {/*(!isEmpty(list) && <div className={styles.sortableList}>
		    	<DragSortableList
		    		items={list}
		    		moveTransitionDuration={0.3}
		    		type="vertical"
		    		onSort={ e => {
		    			onSort(e, true)
		    		}}
		    	/>
		    </div>)}
		    {isEmpty(list) && !isEmpty(defaultList) && (<div className={styles.sortableList}>
		    	<DragSortableList
		    		items={defaultList}
		    		moveTransitionDuration={0.3}
		    		type="vertical"
		    		onSort={ e => {
		    			onSort(e)
		    		}}
		    	/>
		    </div>)*/}
		</div>
	)
}
FileUploader.propTypes = {
  label: PropTypes.string,
  onDrop: PropTypes.func,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func
}
FileUploader.defaultProps = {
  label: 'add label',
  onDrop: () => {},
  defaultValue: [],
  onChange: () => {}
}
export default FileUploader