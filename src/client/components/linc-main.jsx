import React from 'react';
import Header from './common/header.jsx';
import Footer from './common/footer.jsx';


import ModelController from './common/modal-controller.jsx';

export default function LincMain({children}) {
  return (
    <div>
      <Header />
      { children }
      <Footer />
      <ModelController />
    </div>
    );
}
;
