import React from 'react';
import s from './ten-steps-nav.scss'

class TenStepsNav extends React.Component {

  handleActiveStep(index){
    console.log(this.props.section)
    console.log(index)
    if(this.props.section == index) {
      return (
        <div className={s.activeCircleContainer }>
          <div className={s.activeCircle}><span className={s.sectionNum}>{index + 1}</span></div>
        </div>
      )
    } else {
      return (
        <div className={s.circle}></div>
      )
    }
  }



  render() {
    let steps = [
      {
        title: "Plan",
        anchor: "#"
      },
      {
        title: "Fund",
        anchor: "#"
      },
      {
        title: "Location",
        anchor: "#"
      },
      {
        title: "Structure",
        anchor: "#"
      },
      {
        title: "Name",
        anchor: "#"
      },
      {
        title: "Register",
        anchor: "#"
      },
      {
        title: "Tax IDs",
        anchor: "#"
      },
      {
        title: "Licenses & Permits",
        anchor: "#"
      },
      {
        title: "Bank Account",
        anchor: "#"
      },
      {
        title: "10th Step",
        anchor: "#"
      }
    ];

    return (
      <div className={this.props.navType === 'center' ? s.containerCenter : s.containerTop}>
        {
          steps.map((step, index) => {
            return (
              <div className={s.section} key={index}>
                {this.handleActiveStep(index)}
                <div className={s.hoverBox}>
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