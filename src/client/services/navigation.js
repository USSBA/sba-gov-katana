/* eslint-disable no-invalid-this */
function navigate(path, invokingObject) {
  return (event) => {
    invokingObject.props.actions.locationChange(path);
  };
}

export { navigate };