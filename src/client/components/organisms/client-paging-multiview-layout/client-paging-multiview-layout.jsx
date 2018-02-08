import React from 'react'
import styles from './client-paging-multiview-layout.scss'
import { PagingMultiviewLayout } from 'organisms'

// a controller-like class for handling a paging widget where the datastore
// is entirely on the client side (not paging fetches made to server)
class ClientPagingMultiviewLayout extends React.PureComponent {
  constructor(ownProps) {
    super()
    this.state = {
      pageNumber: 1
    }
  }

  handlePageChange(newPageNumber) {
    this.setState({
      pageNumber: newPageNumber
    })
  }

  render() {
    const {
      onReset,
      items,
      pageSize,
      rendererOne,
      rendererTwo,
      rendererOneName,
      rendererTwoName,
      type
    } = this.props
    const start = (this.state.pageNumber - 1) * pageSize
    const end = start + pageSize
    const itemSlice = items.slice(start, end)
    return (
      <div className={`client-paging-multiview-layout ${styles.container}`}>
        <PagingMultiviewLayout
          onPageChange={this.handlePageChange.bind(this)}
          onReset={onReset}
          itemCount={items.length}
          items={itemSlice}
          pageNumber={this.state.pageNumber}
          pageSize={pageSize}
          rendererOne={rendererOne}
          rendererTwo={rendererTwo}
          rendererOneName={rendererOneName}
          rendererTwoName={rendererTwoName}
          type={type}
        />
      </div>
    )
  }
}

ClientPagingMultiviewLayout.defaultProps = {
  onReset: () => {},
  items: [],
  pageSize: 0,
  rendererOne: item => {
    return <div>item</div>
  },
  rendererTwo: item => {
    return <div>item</div>
  },
  rendererOneName: null,
  rendererTwoName: null,
  type: 'items'
}

ClientPagingMultiviewLayout.propTypes = {
  onReset: React.PropTypes.func,
  items: React.PropTypes.array,
  pageSize: React.PropTypes.number,
  rendererOne: React.PropTypes.func,
  rendererTwo: React.PropTypes.func,
  rendererOneName: React.PropTypes.string,
  rendererTwoName: React.PropTypes.string,
  type: React.PropTypes.string
}

export default ClientPagingMultiviewLayout
