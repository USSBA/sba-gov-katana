import React from 'react';
import styles from './section-nav.scss';
import whiteIconLaunch from '../../atoms/icons/white-launch.jsx';
import whiteIconPlan from '../../atoms/icons/white-plan.jsx';
import whiteIconManage from '../../atoms/icons/white-manage.jsx';
import whiteIconGrow from '../../atoms/icons/white-grow.jsx';

let title = "Launch Your Business";
let titleArray = _.words(title);
let firstWord = _.slice(titleArray, 0, 1);
let remainingTitle = _.replace(title, RegExp("^"+firstWord),'');

class SectionNav extends React.Component {

  render() {
    return (
    <div className={styles.SectionNav}>
      <a className={styles.BackLink} href="#">Back to all topics</a>
      <img src={ whiteIconLaunch }/>
      <h2>{firstWord}</h2>
      <h4>{remainingTitle}</h4>
      <hr />
      <ul>
        <li><a href="#">Pick your business location</a></li>
        <li><a href="#">Choose a business structure</a></li>
        <li><a href="#">Choose your business name</a></li>
        <li><a href="#">Register your business</a></li>
        <li><a href="#">Get federal and state tax ID numbers</a></li>
        <li><a href="#">Apply for licenses and permits</a></li>
        <li><a href="#">Open a business bank account</a></li>
        <li><a href="#">Get business insurance</a></li>
      </ul>
    </div>
    );
  }
}

export default SectionNav;
