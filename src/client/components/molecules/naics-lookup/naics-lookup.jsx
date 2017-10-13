import React from 'react';
import AutoSuggest from 'react-autosuggest';

import {
  filter,
  isArray,
  isInteger,
  map,
  reduce,
  startsWith,
  take,
  zip
} from 'lodash';

import naics from '../../../../models/dao/sample-data/naics';
import styles from './naics-lookup.scss'
import theme from './theme.scss';

import {
  SmallIcon,
  TextInput
} from 'atoms';

// // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class NaicsLookup extends React.Component {
  static defaultProps = {
    naics: (() => {
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
            entries: [{
              code,
              description
            }]
          };
        } else {
          industriesMap[industryCode].entries.push({
            code,
            description
          });
        }
      }

      const formattedNaics = reduce(industriesMap, (acc, val, key) => {
        acc.push({
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
      <AutoSuggest
        theme={theme}
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
        renderInputComponent={this.renderInputComponent}
      />
    );
  }

  // # React-Autosuggest-specific

  // Format the NAICs codes from naics.json into a list of suggestions.
  getSuggestions = value => {
    const {
      naics
    } = this.props;

    const escapedValue = escapeRegexCharacters(value.trim());
    const parsedValue = parseInt(escapedValue);

    if (escapedValue === '') {
      return [];
    }

    let sections;
    // Check if the entire input string is a valid integer 1 or greater.
    if (!isNaN(escapedValue) && parsedValue > 0) {
      sections = map(naics, section => {
        return {
          description: section.description,
          entries: filter(section.entries, entry => startsWith(entry.code, parsedValue))
        };
      });
    } else {
      const regex = new RegExp(`${escapedValue}`, 'i');
      sections = map(naics, section => {
        return {
          description: section.description,
          entries: filter(section.entries, entry => regex.test(entry.description))
        };
      });
    }

    const LIMIT = 5;
    let entriesCount = 0;
    const filteredSections = filter(sections, section => section.entries.length > 0);
    let limitedSections = [];
    for (let i = 0; i < filteredSections.length; i++) {
      const section = filteredSections[i];
      const {
        description,
        entries
      } = section;
      const entriesLength = entries.length;

      if (entriesCount + entriesLength < LIMIT) {
        limitedSections.push(section);
      } else {
        limitedSections.push({
          description,
          entries: take(entries, LIMIT - entriesCount)
        })
        break;
      }

      entriesCount += entries.length;
    }

    return limitedSections;
  };

  getSectionSuggestions = section => section.entries;
  // Set the value to show in the input when a suggestion is selected.
  getSuggestionValue = suggestion => suggestion.description;

  // ## Render methods

  renderInputComponent = inputProps => (
    <div style={{
      position: 'relative',
    }}>
      <TextInput {...inputProps} />
      <SmallIcon extraClassName={styles.icon} alt="search icon" fontAwesomeIconClassName="search" />
    </div>
  );

  renderSuggestion = suggestion => (
    <div>
      <p className={styles.entryCode}>{suggestion.code}</p>
      <p className={styles.entryDescription}>{suggestion.description}</p>
    </div>
  );
  renderSectionTitle = section => (<span>{section.description}</span>);

  // ## React Autosuggest event handlers

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // call every time suggestions need to be cleared
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
}

export default NaicsLookup;
