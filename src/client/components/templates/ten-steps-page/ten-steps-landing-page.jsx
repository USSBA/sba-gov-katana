import React from 'react';
import styles from "../../templates/ten-steps-page/ten-steps-landing-page.scss";
import TenStepsSection from "../../molecules/ten-steps-section/ten-steps-section.jsx";

class TenStepsLandingPage extends React.Component {
    render() {
        return (
            <div className={styles.tenStepsLandingPage}>
                <TenStepsSection index={1} title={"Do market research."} leftAlignBox solidBox={false} image={"assets/images/tensteps/research.png"} imageAlt={"Do market research."}/>
                <TenStepsSection index={2} title={"Write your business plan."} leftAlignBox={false} solidBox image={"assets/images/tensteps/plan.jpg"} imageAlt={"Write your business plan."}/>
                <TenStepsSection index={3} title={"Fund your business."} leftAlignBox solidBox={false} image={"assets/images/tensteps/fund.png"} imageAlt={"Fund your business."}/>
                <TenStepsSection index={6} title={"Choose your business name."} leftAlignBox solidBox image={"assets/images/tensteps/name.png"} imageAlt={"Choose your business name."}/>
            </div>
        );
    }
}

export default TenStepsLandingPage;