import React from 'react';
import AutoSuggest from 'react-autosuggest';
import isMobile from 'ismobilejs';

import {
  filter,
  isInteger,
  map,
  reduce,
  startsWith,
  take,
} from 'lodash';

import styles from './naics-lookup.scss'
import theme from './theme.scss';

import { SmallIcon } from 'atoms';

class NaicsLookup extends React.PureComponent {
  static defaultProps = {
    visibleSuggestions: 5
  };

  constructor(props) {
    super(props);

    this.state = {
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
        onSuggestionSelected={this.onSuggestionSelected}
        alwaysRenderSuggestions={true}
        highlightFirstSuggestion={true}
        focusInputOnSuggestionClick={!isMobile /* On mobile devices, lose focus when suggestion is tapped to hide the keyboard. */}
        multiSection={true}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
        renderInputComponent={this.renderInputComponent}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
      />
    );
  }

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onCloseIconSelect = e => {
    const { key } = e;
    if (key && key !== 'Enter') return;

    this.setState({
      suggestions: []
    });
  };

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

  // Let React Autosuggest know where to find suggestions within sections.
  getSectionSuggestions = section => section.entries;

  // Set the value to show in the input when a suggestion is selected.
  getSuggestionValue = suggestion => suggestion.description;

  // ## Render methods

  renderInputComponent = inputProps => {
    const { suggestions } = this.state;
    return (
      <div style={{
        position: 'relative',
      }}>
        <input {...inputProps} />
        {suggestions.length > 0
            ? <SmallIcon
                alt="close icon"
                extraClassName={`${styles.icon} ${styles.closeIcon}`}
                fontAwesomeIconClassName="times"
                onClick={this.onCloseIconSelect}
                onKeyDown={this.onCloseIconSelect}
              />
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
    return (
      <div style={{
        maxHeight: `${suggestionsContainerOpenHeight}px`
      }} {...containerProps}>
        {children}
      </div>
    );
  };

  // ## Event handlers

  onSuggestionsClearRequested = () => { /* no-op */ };

  onSuggestionsFetchRequested = ({ value, reason }) => {
    // If input was changed because user selected a suggestion, do not update
    // the suggestions.
    if (reason === 'suggestion-selected') return;

    const suggestions = this.getSuggestions(value);
    if (suggestions.length === 0) return;

    const { visibleSuggestions } = this.props;
    // The suggestions container should expand to show up to visibleSuggestions
    // entries, considering the height of each entry and the height of any
    // included categories.
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
          // add height of suggestion (entry) to container height
          suggestionsContainerOpenHeight += 57;
          entriesCount++;
          if (entriesCount >= visibleSuggestions) return;
        }
      }
    })();

    this.setState({
      suggestions,
      suggestionsContainerOpenHeight
    });
  };

  onSuggestionSelected = e => {
    this.setState({
      suggestions: [],
    });
  };
}

export default NaicsLookup;
