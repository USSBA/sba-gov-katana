import React from 'react';
import styles from "../../templates/ten-steps-page/ten-steps-landing-page.scss";
import TenStepsSection from "../../molecules/ten-steps-section/ten-steps-section.jsx";

class TenStepsLandingPage extends React.Component {
    render() {
        let titleBoxDataArray = [
            {
                sectionNum: 1,
                title: "Do market research.",
                leftAlignBox: true,
                solidBox: false,
                image: "assets/images/tensteps/research.png",
                imageAlt: "Do market research.",
                link: "/starting-business/how-start-business/10-steps-starting-business",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula nisl sed leo volutpat, sit amet tristique lectus feugiat. Nulla ac faucibus urna. Proin arcu ante, feugiat ut eros vel, suscipit iaculis orci. Praesent felis dolor, finibus non accumsan in, varius vel arcu."
            },
            {
                sectionNum: 2,
                title: "Write your business plan.",
                leftAlignBox: false,
                solidBox: true,
                image: "assets/images/tensteps/plan.jpg",
                imageAlt: "Write your business plan.",
                link: "/starting-business/how-start-business/10-steps-starting-business",
                text: "Your business plan is the foundation of your business. It’s a roadmap for how to structure, run, and grow your new business. You’ll use it to convince people that working with you — or investing in your company — is a smart choice."
            },
            {
                sectionNum: 3,
                title: "Fund your business.",
                leftAlignBox: true,
                solidBox: false,
                image: "assets/images/tensteps/fund.png",
                imageAlt: "Fund your business.",
                link: "/starting-business/how-start-business/10-steps-starting-business",
                text: "Your business plan will help you figure out how much money you’ll need to start your business. If you don’t have that amount on hand, you’ll need to either raise or borrow the capital. Fortunately, there are more ways than ever to find the capital you need."
            },
            {
                sectionNum: 6,
                title: "Choose your business name.",
                leftAlignBox: true,
                solidBox: true,
                image: "assets/images/tensteps/name.jpg",
                imageAlt: "Choose your business name.",
                link: "/starting-business/how-start-business/10-steps-starting-business",
                text: "It’s not easy to pick the perfect name. You’ll want one that reflects your brand and captures your spirit. You’ll also want to make sure your business name isn’t already being used by someone else."
            }
        ];

        const tenstepSectionItems = titleBoxDataArray.map((item, index)=>{
            return(<TenStepsSection key={index} index={index} sectionItem={item}/>);
        });

        return (
            <div id="tenStepsLandingPageID" className={styles.tenStepsLandingPage}>
                {tenstepSectionItems}
            </div>
        );
    }
}

export default TenStepsLandingPage;