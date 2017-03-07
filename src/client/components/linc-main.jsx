import React from 'react';
import Header from './common/header.jsx';
import Footer from './common/footer.jsx';

import ModalController from './common/modal-controller.jsx';

export default function LincMain({children}) {
  return (
    <div>
      <Header theme="money-green" />
      { children }
      <Footer/>
      <ModalController/>
    </div>
  )
}
