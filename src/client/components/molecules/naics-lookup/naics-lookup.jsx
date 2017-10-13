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
  SmallIcon
} from 'atoms';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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

class NaicsLookup extends React.PureComponent {
  static defaultProps = {
    naics: formatNaics(naics)
  };

  constructor(props) {
    super();

    this.state = {
      isSuggestionsContainerOpen: false,
      suggestions: [],
      suggestionsContainerOpenHeight: 0,
      value: '',
    };
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange
    };

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
        renderSuggestionsContainer={this.renderSuggestionsContainer}
      />
    );
  }

  // # React-Autosuggest-specific

  // Filter the list of NAICS codes against the input.
  getSuggestions = value => {
    const { naics } = this.props;
    const sanitizedValue = value.trim().toLowerCase();

    if (sanitizedValue === '') {
      return [];
    }

    const sections = map(naics, section => {
      const { description, entries } = section;
      // If the industry description contains the input string, return all the
      // entries under that industry.
      if (description.toLowerCase().indexOf(sanitizedValue) !== -1) {
        return {
          description,
          entries
        };
      }

      // If the input string is an integer, return entries whose codes start
      // with the input. Otherwise, return entries whose descriptions contain
      // the input.
      const filterFunction = !isNaN(sanitizedValue)
        ? entry => startsWith(entry.code, sanitizedValue)
        : entry => entry.description.toLowerCase().indexOf(sanitizedValue) !== -1;

      return {
        description,
        entries: filter(entries, filterFunction)
      };
    });

    return filter(sections, section => section.entries.length > 0);
  };

  getSectionSuggestions = section => section.entries;

  // Set the value to show in the input when a suggestion is selected.
  getSuggestionValue = suggestion => suggestion.description;

  // ## Render methods

  renderInputComponent = inputProps => {
    const { isSuggestionsContainerOpen } = this.state;
    return (
      <div style={{
        position: 'relative',
      }}>
        <input {...inputProps} />
        {isSuggestionsContainerOpen
          ? <SmallIcon extraClassName={`${styles.icon} ${styles.closeIcon}`} alt="close icon" fontAwesomeIconClassName="times" />
          : <i className={`fa fa-search ${styles.icon} ${styles.searchIcon}`} alt="search icon"></i>}
      </div>
    );
  }

  renderSectionTitle = section => (<span>{section.description}</span>);

  renderSuggestion = suggestion => (
    <div>
      <p className={styles.entryCode}>{suggestion.code}</p>
      <p className={styles.entryDescription}>{suggestion.description}</p>
    </div>
  );

  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    const { suggestionsContainerOpenHeight } = this.state;
    console.log(containerProps);
    return (
      <div style={{
        maxHeight: `${suggestionsContainerOpenHeight}px`
      }} {...containerProps}>
        {children}
      </div>
    );
  };

  // ## Event handlers

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = this.getSuggestions(value);

    // The suggestions container should expand to show up to LIMIT entries,
    // considering the height of each entry and the height of any included
    // categories.
    const LIMIT = 10;
    let entriesCount = 0;
    // add extra top padding + extra bottom padding to container height
    let suggestionsContainerOpenHeight = 8 + 6;
    // Declare an anonymous function, and `return` to break from the nested
    // loop.
    (() => {
      for (let i = 0; i < suggestions.length; i++) {
        // add height of section title (category) to container height
        suggestionsContainerOpenHeight += 18;

        const { entries } = suggestions[i];
        for (let j = 0; j < entries.length; j++) {
          // Add height of suggestion (entry) to container height
          suggestionsContainerOpenHeight += 57;
          entriesCount++;
          if (entriesCount >= LIMIT) return;
        }
      }
    })();

    if (suggestions.length > 0) {
      this.setState({
        isSuggestionsContainerOpen: true,
        suggestions,
        suggestionsContainerOpenHeight
      });
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      isSuggestionsContainerOpen: false,
      suggestions: []
    });
  };
}

export default NaicsLookup;
