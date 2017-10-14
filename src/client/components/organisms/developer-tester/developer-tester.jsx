import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduce } from 'lodash';

import styles from "./developer-tester.scss";

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

    industriesMap[industryCode].entries.push({
      code,
      description,
      industryCode,
      industryDescription
    });
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
  render() {
    const naics = [
      {
          "code": "111110",
          "description": "Soybean Farming",
          "sectorId": "11",
          "sectorDescription": "Agriculture, Forestry, Fishing and Hunting",
          "subsectorId": "111",
          "subsectorDescription": "Crop Production",
          "revenueLimit": 0.75,
          "employeeCount": null,
          "footnote": null,
          "parent": null
      },
      {
          "code": "111120",
          "description": "Oilseed (except Soybean) Farming",
          "sectorId": "11",
          "sectorDescription": "Agriculture, Forestry, Fishing and Hunting",
          "subsectorId": "111",
          "subsectorDescription": "Crop Production",
          "revenueLimit": 0.75,
          "employeeCount": null,
          "footnote": null,
          "parent": null
      },
      {
        "code": "111130",
        "description": "Dry Pea and Bean Farming",
        "sectorId": "11",
        "sectorDescription": "Agriculture, Forestry, Fishing and Hunting",
        "subsectorId": "111",
        "subsectorDescription": "Crop Production",
        "revenueLimit": 0.75,
        "employeeCount": null,
        "footnote": null,
        "parent": null
      },
      {
        "code": "211120",
        "description": "Crude Petroleum Extraction",
        "sectorId": "21",
        "sectorDescription": "Mining, Quarrying, and Oil and Gas Extraction",
        "subsectorId": "211",
        "subsectorDescription": "Oil and Gas Extraction",
        "revenueLimit": null,
        "employeeCount": 1250,
        "footnote": null,
        "parent": null
      },
      {
        "code": "211130",
        "description": "Natural Gas Extraction",
        "sectorId": "21",
        "sectorDescription": "Mining, Quarrying, and Oil and Gas Extraction",
        "subsectorId": "211",
        "subsectorDescription": "Oil and Gas Extraction",
        "revenueLimit": null,
        "employeeCount": 1250,
        "footnote": null,
        "parent": null
      },
      {
        "code": "212111",
        "description": "Bituminous Coal and Lignite Surface Mining",
        "sectorId": "21",
        "sectorDescription": "Mining, Quarrying, and Oil and Gas Extraction",
        "subsectorId": "212",
        "subsectorDescription": "Mining (except Oil and Gas)",
        "revenueLimit": null,
        "employeeCount": 1250,
        "footnote": null,
        "parent": null
      },
      {
        "code": "221111",
        "description": "Hydroelectric Power Generation",
        "sectorId": "22",
        "sectorDescription": "Utilities",
        "subsectorId": "221",
        "subsectorDescription": "Utilities",
        "revenueLimit": null,
        "employeeCount": 500,
        "footnote": null,
        "parent": null
      },
      {
        "code": "221112",
        "description": "Fossil Fuel Electric Power Generation",
        "sectorId": "22",
        "sectorDescription": "Utilities",
        "subsectorId": "221",
        "subsectorDescription": "Utilities",
        "revenueLimit": null,
        "employeeCount": 750,
        "footnote": null,
        "parent": null
      },
      {
        "code": "221113",
        "description": "Nuclear Electric Power Generation",
        "sectorId": "22",
        "sectorDescription": "Utilities",
        "subsectorId": "221",
        "subsectorDescription": "Utilities",
        "revenueLimit": null,
        "employeeCount": 750,
        "footnote": null,
        "parent": null
      }
    ];

    return (
      <NaicsLookup
        onSelect={suggestion => {
          // const {
          //   code,
          //   description,
          //   industryCode,
          //   industryDescription
          // } = suggestion;
          console.log(suggestion);
        }}
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
