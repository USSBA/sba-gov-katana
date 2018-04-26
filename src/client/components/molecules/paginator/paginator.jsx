import React, { PropTypes } from 'react'
import classNames from 'classnames'

import styles from './paginator.scss'
import { Button } from 'atoms'

// TODO: documentation
const Paginator = props => {
  const { id, onBack, onForward, pageNumber, pageSize, total } = props

  // Choose the minimum of the total or the calculation in case the total is zero.
  const start = Math.min(1 + (pageNumber - 1) * pageSize, total)
  const end = Math.min(start + pageSize - 1, total)

  const renderArrowButton = direction => (
    <Button
      id={id}
      onClick={direction === 'left' ? onBack : onForward}
      key={direction}
      secondary
      spacing={false}
    >
      <i
        alt={`${direction === 'left' ? 'previous' : 'next'} page`}
        aria-hidden="true"
        className={`fa fa-fw fa-chevron-${direction}`}
      />
    </Button>
  )

  const className = classNames({
    paginator: true,
    [styles.paginator]: true
  })

  return (
    <div className={className} id={id}>
      <span>
        Showing <strong className="text-primary">{start}</strong> <span className={styles.spacing}>-</span>{' '}
        <strong className="text-primary">{end}</strong> <span className={styles.spacing}>of</span>{' '}
        <strong className="text-primary">{total}</strong>
      </span>
      {['left', 'right'].map(direction => renderArrowButton(direction))}
    </div>
  )
}

Paginator.propTypes = {
  id: PropTypes.string,
  onBack: PropTypes.func,
  onForward: PropTypes.func,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number
}

Paginator.defaultProps = {
  pageNumber: 1,
  pageSize: 0,
  total: 0
}

export default Paginator
