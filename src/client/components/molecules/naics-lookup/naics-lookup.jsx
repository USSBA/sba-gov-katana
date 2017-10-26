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

import theme, * as styles from './naics-lookup.scss';
import { SmallIcon } from 'atoms';

class NaicsLookup extends React.PureComponent {
  static defaultProps = {
    // Begin getting suggestions at character n of the input.
    inputLengthToGetSuggestions: 0,
    onSelect: () => {},
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
    const { inputProps: extraInputProps } = this.props;
    const { value, suggestions } = this.state;

    const inputProps = {
      ...extraInputProps,
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
        focusInputOnSuggestionClick={!isMobile.any /* On mobile devices, lose focus when a suggestion is tapped to hide the keyboard. */}
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
    if (key && key !== 'Enter' && key !== 'Escape') return;

    this.setState({
      value: '',
      suggestions: []
    });
  };

  // # React-Autosuggest-specific

  // Filter the list of NAICS codes against the input.
  getSuggestions = value => {
    const { inputLengthToGetSuggestions, naics } = this.props;
    const sanitizedValue = value.trim().toLowerCase();

    if (
      sanitizedValue === ''
      || sanitizedValue.length < inputLengthToGetSuggestions
    ) {
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
                extraClassName={styles.closeIcon}
                fontAwesomeIconClassName="times"
                onClick={this.onCloseIconSelect}
                onKeyDown={this.onCloseIconSelect}
              />
          : <i className={`fa fa-search ${styles.searchIcon}`} alt="search icon"></i>}
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
    // If the input was changed because the user selected a suggestion, do not
    // update the suggestions.
    if (reason === 'suggestion-selected') return;

    const suggestions = this.getSuggestions(value);
    if (suggestions.length === 0
      || value === ''
      || reason === 'escape-pressed') {
      this.setState({
        suggestions: []
      });
      return;
    }

    // The suggestions container should expand to show up to
    // maxVisibleSuggestions entries, considering the height of each entry and
    // the height of any included categories.
    const { maxVisibleSuggestions } = this.props;
    let visibleSuggestions = 0;
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
          visibleSuggestions++;
          if (visibleSuggestions >= maxVisibleSuggestions) return;
        }
      }
    })();

    this.setState({
      suggestions,
      suggestionsContainerOpenHeight
    });
  };

  onSuggestionSelected = (e, { sectionIndex, suggestionIndex }) => {
    // Call onSelect with the selected suggestion data.
    const { onSelect } = this.props;
    const { suggestions } = this.state;
    onSelect.call(null, suggestions[sectionIndex].entries[suggestionIndex]);

    // Reset the suggestions.
    this.setState({
      suggestions: [],
    });
  };
}

export default NaicsLookup;
