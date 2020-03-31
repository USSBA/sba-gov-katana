import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import marker from 'assets/svg/marker.svg'
import styles from './lender-result.scss'

class LenderResult extends React.PureComponent {
  componentDidMount() {
    if (document) {
      const { id, length } = this.props
      if (id === `result-${length - 1}`) {
        document.querySelector('.search-info-panel').focus()
      }
    }
  }

  onClick(e) {
    this.props.showDetailState(e)
  }

  render() {
    const {
      id,
      item: { fields: item, exprs },
      hoveredMarkerId
    } = this.props
    const distance = exprs ? exprs.distance : null
    if (!item) {
      return null
    }

    const city = item.city ? item.city[0] : null
    const state = item.state ? item.state[0] : null

    const isFirstResult = id === 'result-0'
    const isHovered = this.props.item.id === hoveredMarkerId

    const cardLayoutClassName = classNames({
      'card-layout': true,
      [styles.lenderResultContainer]: true,
      [styles.hoveredBorder]: isHovered,
      [styles.focus]: true
    })

    const innerDivClassName = classNames({
      [styles.lenderResult]: true,
      [styles.hoveredInnerDiv]: isHovered,
      [styles.isFirstHoveredResult]: isHovered && isFirstResult,
      [styles.focus]: true
    })

    return (
      <a
        id={`lender-result-container-${id}`}
        className={cardLayoutClassName}
        aria-label={item.lender_name[0]}
        tabIndex="0"
        onMouseOver={() => {
          if (!isHovered) {
            this.props.onResultHover(this.props.item.id)
          }
        }}
        onFocus={() => {
          if (!isHovered) {
            this.props.onResultHover(this.props.item.id)
          }
        }}
        onMouseOut={() => {
          if (isHovered) {
            this.props.onResultHover({})
          }
        }}
        onBlur={() => {
          if (isHovered) {
            this.props.onResultHover({})
          }
        }}
        onClick={e => {
          e.preventDefault()
          this.onClick({
            item,
            distance
          })
        }}
        onKeyUp={obj => {
          const enterKeyCode = 13
          if (obj.keyCode === enterKeyCode) {
            this.onClick({
              item,
              distance
            })
          }
        }}
      >
        <div id={`lender-result-${id}`} className={innerDivClassName}>
          <div>
            <div className={styles.distance}>
              <div>
                <img src={marker} className={styles.marker} />
              </div>
              <div id={`lender-miles-${id}`} className={styles.miles}>
                {distance !== null ? (
                  <Distance distance={distance} />
                ) : (
                  <Location city={city} state={state} />
                )}
              </div>
              <div className={styles.clear} />
            </div>
            <div id={`lender-title-${id}`}>
              <h2>
                <i className="fa fa-chevron-right" data-cy="open detail" />
                {item.lender_name[0]}
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.hr}>
          <hr />
        </div>
      </a>
    )
  }
}

const Distance = ({ distance }) => <div>{`${Number(distance).toFixed(1)} miles`}</div>
const Location = ({ city, state }) => (
  <div>{`${[city, state].filter(item => item !== null).join(', ')}`}</div>
)

LenderResult.defaultProps = {
  id: 'result',
  onClick: () => {},
  onResultHover: () => {}
}

LenderResult.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string, //.isRequired
  onClick: PropTypes.func,
  onResultHover: PropTypes.func
}

export default LenderResult
