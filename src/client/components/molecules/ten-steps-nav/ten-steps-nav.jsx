import React from 'react';
import s from './ten-steps-nav.scss'

class TenStepsNav extends React.Component {

  renderStep(index){
    if(this.props.section == index) {
      return (
        <div className={s.sectionCircleContainer }>
          <div className={s.activeCircle}><span className={s.sectionNum}>{index + 1}</span></div>
        </div>
      )
    } else {
      return (
        <div className={this.props.navType === "center" ? s.circleNegative : s.circle}></div>
      )
    }
  }

  handleAnchorClick(index){
    document.location.href = "#step-" + index + 1
  }



  render() {
    let steps = [
      {
        title: "Research"
      },
      {
        title: "Plan"
      },
      {
        title: "Fund"
      },
      {
        title: "Location"
      },
      {
        title: "Structure"
      },
      {
        title: "Name"
      },
      {
        title: "Register"
      },
      {
        title: "Tax IDs"
      },
      {
        title: "License"
      },
      {
        title: "Banking"
      }
    ];

    return (
      <div id="ten-steps-nav" aria-hidden="true" className={this.props.navType === 'center' ? s.containerCenter : s.containerTop}>
        {
          steps.map((step, index) => {
            return (
              <div className={s.section} key={index}>
                {this.renderStep(index)}
                  <div className={s.hoverBox} onClick={() => {this.handleAnchorClick(index)}}>
                    <div className={s.title}>{step.title}</div>
                    <div className={s.activeCircleContainer }>
                      <div className={s.activeCircle}><span className={s.sectionNum}>{index + 1}</span></div>
                    </div>
                  </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default TenStepsNav;