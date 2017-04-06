import React from 'react';
import Header from './organisms/header-footer/header.jsx';
import Footer from './organisms/header-footer/footer.jsx';

import ModalController from './modal-controller.jsx';

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
