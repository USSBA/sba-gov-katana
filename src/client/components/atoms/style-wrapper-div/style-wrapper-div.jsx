import React from 'react'
/* A wrapper for styling search components since divs don't do prop pass through */
class StyleWrapperDiv extends React.Component {
  render() {
    const { className, children, ...rest } = this.props
    return (
      <div className={className}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, { ...rest })
        })}
      </div>
    )
  }
}

StyleWrapperDiv.propTypes = {
  style: React.PropTypes.string
}

export default StyleWrapperDiv
