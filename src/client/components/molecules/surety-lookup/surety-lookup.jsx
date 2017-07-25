import React from "react"
import s from "./surety-lookup.scss";
import SmallInverseSecondaryButton from '../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx';
import MultiSelect from "../../atoms/multiselect/multiselect.jsx";

class SuretyLookup extends React.Component {

  constructor() {
    super();
    this.state = {
      filteredItems: []
    }
  }

  render() {
    return(
      <div>
        <div>
          <p>Check the database of surety agencies that offer SBA-guranteed bonds. Contact a surety agency in your state to get started with the application process.</p>
        </div>
      </div>
    )
  }
}

export default SuretyLookup;
