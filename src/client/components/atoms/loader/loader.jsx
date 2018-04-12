import React from 'react'

import logo from 'assets/images/logo-no-text.svg'
import s from './loader.scss'

const Loader = props => {
  return (
    <div className={s.container + ' ' + props.className}>
      <img className={s.logo} src={logo} />
      <div className={s.loader} />
    </div>
  )
}

export default Loader
