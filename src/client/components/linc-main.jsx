import React from 'react';

import Header from './common/header.jsx';
import Footer from './common/footer.jsx';



export default function LincMain({children}){
  return (
      <div>
          <Header />
            {children}
          <Footer />
      </div>
  );
};

