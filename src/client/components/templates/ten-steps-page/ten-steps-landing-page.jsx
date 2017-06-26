import React from 'react';
import styles from "../../templates/ten-steps-page/ten-steps-landing-page.scss";
import TenStepsSection from "../../molecules/ten-steps-section/ten-steps-section.jsx";

class TenStepsLandingPage extends React.Component {
    render() {
        let titleBoxDataArray = [
            {
                sectionNum: 1,
                title: "Conduct market research.",
                leftAlignBox: true,
                solidBox: false,
                image: "assets/images/tensteps/research.png",
                imageAlt: "Do market research.",
                link: "/business-guide/plan/47",
                text: "Market research will tell you if there’s an opportunity to turn your idea into a successful business. It’s a way to gather information about potential customers and businesses already operating in your area. Use that information to find a competitive advantage for your business."
            },
            {
                sectionNum: 2,
                title: "Write your business plan.",
                leftAlignBox: false,
                solidBox: true,
                image: "assets/images/tensteps/plan.jpg",
                imageAlt: "Write your business plan.",
                link: "/business-guide/plan/78",
                text: "Your business plan is the foundation of your business. It’s a roadmap for how to structure, run, and grow your new business. You’ll use it to convince people that working with you — or investing in your company — is a smart choice."
            },
            {
                sectionNum: 3,
                title: "Fund your business.",
                leftAlignBox: true,
                solidBox: false,
                image: "assets/images/tensteps/fund.jpg",
                imageAlt: "Fund your business.",
                link: "/business-guide/plan/50",
                text: "Your business plan will help you figure out how much money you’ll need to start your business. If you don’t have that amount on hand, you’ll need to either raise or borrow the capital. Fortunately, there are more ways than ever to find the capital you need."
            },
            {
                sectionNum: 4,
                title: "Pick your business location.",
                leftAlignBox: false,
                solidBox: true,
                image: "assets/images/tensteps/location.jpg",
                imageAlt: "Fund your business.",
                link: "/business-guide/launch/48",
                text: "Your business location is one of the most important decisions you’ll make. Whether you’re setting up a brick-and-mortar business or launching an online store, the choices you make could affect your taxes, legal requirements, and revenue."
            },
            {
                sectionNum: 5,
                title: "Choose a business structure.",
                leftAlignBox: true,
                solidBox: false,
                image: "assets/images/tensteps/business-structure-scrabble.png",
                imageAlt: "Fund your business.",
                link: "/business-guide/launch/59",
                text: "The legal structure you choose for your business will impact your business registration requirements, how much you pay in taxes, and your personal liability."
            },
            {
                sectionNum: 6,
                title: "Name your business.",
                leftAlignBox: true,
                solidBox: true,
                image: "assets/images/tensteps/name.jpg",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/5",
                text: "It’s not easy to pick the perfect name. You’ll want one that reflects your brand and captures your spirit. You’ll also want to make sure your business name isn’t already being used by someone else."
            },
            {
                sectionNum: 7,
                title: "Register your business.",
                leftAlignBox: false,
                solidBox: true,
                image: "assets/images/tensteps/register.jpg",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/51",
                text: "Once you’ve picked the perfect business name, it’s time to make it legal and protect your brand. If you’re doing business under a name different than your own, you’ll need to register with the federal government, and maybe your state government, too."
            },
            {
                sectionNum: 8,
                title: "Get federal and state tax IDs.",
                leftAlignBox: true,
                solidBox: false,
                image: "assets/images/tensteps/tax-ids.png",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/53",
                text: "You’ll use your employer identification number (EIN) for important steps to start and grow your business, like opening a bank account and paying taxes. It’s like a social security number for your business. Some — but not all — states require you to get a tax ID as well."
            },
            {
                sectionNum: 9,
                title: "Apply for licenses and permits.",
                leftAlignBox: false,
                solidBox: true,
                image: "assets/images/tensteps/license.jpg",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/66",
                text: "Keep your business running smoothly by staying legally compliant. The licenses and permits you need for your business will vary by industry, state, location, and other factors."
            },
            {
                sectionNum: 10,
                title: "Open a business bank account.",
                leftAlignBox: true,
                solidBox: false,
                image: "assets/images/tensteps/bank.jpg",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/52",
                text: "A small business checking account can help you handle legal, tax, and day-to-day issues. The good news is it’s easy to set one up if you have the right registrations and paperwork ready."
            }
        ];      const tenstepSectionItems = titleBoxDataArray.map((item, index)=>{
            return(<TenStepsSection index={index} key={index} sectionItem={item}/>);
        });

        return (
            <div className={styles.tenStepsLandingPage}>
                <div className={styles.titleSection}>
                    <div className={styles.titleSectionText}>
                    <h1>10 steps to start your business.</h1>
                    <p>Starting a business involves planning, making key financial decisions, and completing a series of legal activities. Scroll down to learn about each step.</p>
                    </div>
                    <a className={styles.scrollButton} aria-hidden="true" href="#step-01"><i className={" fa fa-angle-down"}></i></a>
                    <a className={styles.backLink} href="/business-guide">Back to all topics</a>
                </div>
                <div id="tensteps-landing-page-id" className={styles.tenStepsLandingPage}>
                    {tenstepSectionItems}
                </div>
            </div>
        );
    }
}

export default TenStepsLandingPage;
