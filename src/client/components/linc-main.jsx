import React from 'react';
import Header from './common/header.jsx';
import Footer from './common/footer.jsx';
import styles from './common/header.scss';

import ModalController from './common/modal-controller.jsx';

export default function LincMain({children}) {
  return (
    <div className={ styles['money-green'] }>
      <Header/>
      { children }
      <Footer/>
      <ModalController/>
    </div>
  )
}
