import React from 'react';

import Header from './common/header.jsx';
import Footer from './common/footer.jsx';


class LincMain extends React.Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default LincMain;
