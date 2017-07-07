import React from 'react';
import styles from './error-page.scss';
import errorImg from "../../../../../public/assets/images/error-page/SBA_404.png";
import SmallIcon from "../../atoms/small-icon/small-icon.jsx";
import TextInput from "../../atoms/text-input/text-input.jsx";

class ErrorPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            searchValue: ""
        };
    }

    handleSearchChange(e) {
        event.preventDefault();
        this.setState({searchValue: e.target.value});
    }

    submitSearch(e) {
        e.preventDefault();
        let uri = encodeURI("/tools/search-result-page?search=" + this.state.searchValue);
        document.location = uri;
    }
    render() {
        return (
            <div className={styles.errorContainer}>
                <img src={errorImg} alt="Error Image"/>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>
                        404
                    </h1>
                    <h3 className={styles.subTitle}>
                        Just like a business on the moon, the page you're looking for doesn't exist.
                    </h3>
                    <p>
                        Return to the <a href="/">home page</a>, or search for what you're trying to find.
                    </p>
                    <form key={2} id="error-form" className={styles.errorPageSearch} onSubmit={this.submitSearch.bind(this)}>
                        <TextInput  id="error-page-search-input" placeholder='Search' onChange={this.handleSearchChange.bind(this)} autoFocus/>
                        <SmallIcon extraClassName={styles.errorPageSearchIcon} id="error-page-search-button" onClick={this.submitSearch.bind(this)} alt="error page search button" fontAwesomeIconClassName="search"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default ErrorPage;