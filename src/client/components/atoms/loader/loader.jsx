import React from 'react'

import logo from 'assets/images/logo-no-text.svg'
import style from './loader.scss'

const Loader = props => {
  return (
    <div className={`loader ${style.container}`} data-cy="loader">
      <img className={style.logo} src={logo} />
      <div className={style.loader} />
    </div>
  )
}

export default Loader
