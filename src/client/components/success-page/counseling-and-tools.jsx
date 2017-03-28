import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import *  as ContentActions from '../../actions/content.js';

import { Row, Col, Button } from 'react-bootstrap';
import styles from '../../styles/success-page/counseling-and-tools.scss';


export class DynamicCounselingAndTools extends React.Component {
  constructor() {
    super();
    this.state = {
      counselors: null,
      counselorsErr: null
    }
  }

  componentWillMount() {
    this.props.actions.fetchContentIfNeeded('counselors', 'counselors-by-location', {
      zip: this.props.businessInfoData.businessInfoZipcode
    })
      .then((res) => {
        this.setState({
          counselors: this.props.counselorsData
        })
      })
      .catch((err) => {
        this.setState({
          counselorsErr: err
        });
      })
  }

  redirectLocalAssistance() {
    let newTab = window.open("", "_blank");
    this.props.actions.fetchContentIfNeeded('counselorsRedirect', 'counselors-redirect', {
      zip: this.props.businessInfoData.businessInfoZipcode
    })
      .then((res) => {
        console.log(res.data.redirectTo);
        newTab.location = res.data.redirectTo;
      })
  }

  trimStr(str) {
    return str.length > 40 ? str.slice(0, 40) + "..." : str
  }

  getMiles(num) {
    let miles = parseInt(num) * 0.000621371192;
    return Math.round(miles * 100) / 100
  }

  createCounselorBoxes() {
    const counselorsObj = this.state.counselors;
    return Object.keys(counselorsObj).map((key) => {
      let counselor = counselorsObj[key];
      return (
        <div className={ styles.counselorBox }>
          <h3 className={ styles.counselorTitle }>
                                                    { this.trimStr(counselor['title']) || "Not Available" }
                                                  </h3>
          <p className={ styles.counselorAttr }>
            { counselor['name'] || "Not Available" }
          </p>
          <p className={ styles.counselorAttr }>
            { counselor['street'] + ", " + counselor['additional'] || "Not Available" }
          </p>
          <p className={ styles.counselorAttr }>
            { counselor['city'] + ", " + counselor['province'] + " " + counselor['postal_code'] }
          </p>
          <p className={ styles.counselorAttr }>
            { this.getMiles(counselor['location_distance']) + " miles away" }
          </p>
          <p className={ styles.counselorAttr }>
            { counselor['phone'] ? 'Phone: ' + counselor['phone'] : "Not Available" }
          </p>
        </div>
      )
    });
  }

  displayCounselors() {
    if (this.state.counselors == null && this.state.counselorsErr == null) {
      return (<div className={ styles.counselorBox }>
                <div className={ styles.loader }></div>
              </div>)
    } else if (this.state.counselors && this.state.counselorsErr == null) {
      return this.createCounselorBoxes()
    } else if (this.state.counselorsErr) {
      return (<div className={ styles.counselorBox }>
                <p> Sorry we were unable to process your zipcode.</p>
              </div>)
    }
  }


  render() {
    const counselorBoxes = this.props.counselorsData;
    return (
      <div className={ styles.section }>
        <h2 className={ styles.title }>Get free, personalized help from a local counselor</h2>
        <h5 className={ styles.subTitle }>Local Counselors can help you prepare materials and introduce you to additional lenders</h5>
        <div className={ styles.counselorContainer }>
          { this.displayCounselors() }
        </div>
        <button className={ styles.seeMoreBtn } onClick={ () => this.redirectLocalAssistance() }>SEE MORE</button>
      </div>
    )
  }
  ;
}


function mapStateToProps(state) {
  return {
    businessInfoData: state.lenderMatch.businessInfoData || {
        zipcode: 21202
    },
    counselorsData: state.contentReducer["counselors"]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicCounselingAndTools)
