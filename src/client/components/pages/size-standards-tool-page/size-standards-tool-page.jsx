import React from 'react'
import { SizeStandardsTool } from 'organisms'
import styles from './size-standards-tool-page.scss'

const sizeStandardsToolPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <SizeStandardsTool />
      </div>
    </div>
  )
}

export default sizeStandardsToolPage
