import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduce } from 'lodash';

import styles from "./developer-tester.scss";
import naics from '../../../../models/dao/sample-data/naics';

import {
  NaicsLookup
} from "molecules";

// Format the list of naics from the API into a structure suitable for React
// Autosuggest, i.e. into a list of sections (naics categories/industries) that
// contain entries (naics codes and descriptions).
function formatNaics (naics) {
  const industriesMap = {};
  for (let i = 0; i < naics.length; i++) {
    const {
      code,
      description,
      sectorDescription: industryDescription,
      sectorId: industryCode,
    } = naics[i];

    if (!industriesMap.hasOwnProperty(industryCode)) {
      industriesMap[industryCode] = {
        description: industryDescription,
        entries: []
      };
    }

    industriesMap[industryCode].entries.push({ code, description, industryDescription });
  }

  return reduce(industriesMap, (acc, val, key) => {
    acc.push({
      description: val.description,
      entries: val.entries
    });
    return acc;
  }, []);
}

export class DeveloperTester extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <NaicsLookup
        naics={formatNaics(naics)}
        visibleSuggestions={5}
      />
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(DeveloperTester);
