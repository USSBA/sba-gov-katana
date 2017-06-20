import React from 'react';
import styles from "../../templates/ten-steps-page/ten-steps-landing-page.scss";
import TenStepsSection from "../../molecules/ten-steps-section/ten-steps-section.jsx";

class TenStepsLandingPage extends React.Component {
    render() {
        return (
            <div className={styles.tenStepsLandingPage}>
                <TenStepsSection/>
            </div>
        );
    }
}

export default TenStepsLandingPage;