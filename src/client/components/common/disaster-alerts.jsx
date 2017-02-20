import React from 'react';
import styles from '../../styles/disaster-alerts.scss'
import cookie from 'react-cookie';
import exitIcon from '../../../../public/assets/svg/exit-modal-close.svg';


class DisasterAlerts extends React.Component {
  componentWillMount() {
    this.state = {
      isVisible: (cookie.load('close_disaster_loan_parature') ? false : true),
    }
  }

  handleClose() {
    this.setState({
      isVisible: false
    });
    cookie.save('close_disaster_loan_parature', '1', {
      path: '/',
      secure: true
    });
  }

  render() {
    return (
      <div>
        { this.state.isVisible
          ? <div className={ styles.applyForDisasterLoanParatureWrapper }>
              <div className={ styles.disasterLoanParature }>
                <div className={ styles.triangleIcon + " fa fa-exclamation-triangle" } aria-hidden="true"></div>
                <div className={ styles.disasterDescription }>Have you been affected by the Louisiana Flooding?</div>
                <a href='https://disasterloan.sba.gov/ela/' title='Apply for disaster loan' className={ styles.disasterBtn }>APPLY FOR DISASTER LOAN</a>
                <div className={ styles.disasterLoanParatureClose } onClick={ this.handleClose.bind(this) }>
                  <img className={ styles.closeIcon } src={ exitIcon } />
                </div>
              </div>
            </div>
          : null }
      </div>
    )
  }
}

export default DisasterAlerts;