import React from 'react';
import AutoSuggest from 'react-autosuggest';

import {
  filter,
  isArray,
  isInteger,
  map,
  reduce,
  startsWith,
  zip
} from 'lodash';

import { container } from './naics-lookup.scss';

import _naics from '../../../../models/dao/sample-data/naics';

// // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class NaicsLookup extends React.Component {
  static defaultProps = {
    naics: (() => {
      const naics = _naics;
      // const naics = _naics.slice(0, 1);
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
            code: industryCode,
            description: industryDescription,
            entries: [{
              code,
              description
            }]
          }
        } else {
          industriesMap[industryCode].entries.push({
            code,
            description
          });
        }
      }

      const formattedNaics = reduce(industriesMap, (acc, val, key) => {
        acc.push({
          code: val.code,
          description: val.description,
          entries: val.entries
        });
        return acc;
      }, []);

      return formattedNaics;
    })()
  };

  constructor(props) {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange
    };

    // 804px
    return (
      <div className={container}>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
          multiSection={true}
          renderSectionTitle={this.renderSectionTitle}
          getSectionSuggestions={this.getSectionSuggestions}
        />
      </div>
    );
  }

  // # React-Autosuggest-specific

  // Format the NAICs codes from naics.json into a list of suggestions.
  getSuggestions = value => {
    const {
      naics
    } = this.props;

    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    if (isInteger(value) && value > 0) {
      const sections = map(naics, section => {
        return {
          description: section.description,
          entries: filter(section.entries, entry => startsWith(entry.code, escapedValue))
        }
      });

      return filter(sections, section => section.entries.length > 0)
    } else {
      const regex = new RegExp(`${escapedValue}`, 'i')
      const sections = map(naics, section => {
        return {
          description: section.description,
          entries: filter(section.entries, entry => regex.test(entry.description))
        }
      });

      return filter(sections, section => section.entries.length > 0)
    }
  };

  getSectionSuggestions = section => section.entries;

  // input value shown when suggestion is selected
  getSuggestionValue = suggestion => suggestion.description;


  renderSuggestion = suggestion => (<span>{suggestion.description}</span>);
  renderSectionTitle = section => (<strong>{section.description}</strong>);

  // ## React Autosuggest event handlers

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue
    })
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  };

  // called everytime suggestions need to be cleared
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

}

export default NaicsLookup;
