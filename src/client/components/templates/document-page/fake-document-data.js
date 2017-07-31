// Charles,
// i have been working to figure out what kind of object we need to make these document pages work
// since you are building the facade portion, I will hardcode an object locally on the client
// i have based this object on a) what is in the wireframe and b) what the json api returns from Drupal
// i have tried to keep the key names similar to what the api returns, but some may have to be specifically formatted
// your endpoint does not necessarily need to return this exact object format / structure. But the DATA in this object is necessary for the document page

// below are some notes on the api response that might be useful to you when building the endpoint

//NOTES
// summary: the summary can have double quotes in the string, so that will need to be handled. I would expect the same for the Body. It will need to be sanitized.
// activity: i have not seen this property used anywhere in the wireframe... but it's in the form when creating a document
// some of these properties are nested deep...
// THE URL IS NOT WORKING... it does not point to a pdf... "http://content.sba.fun/sites/default/files/2017-07/serv_tools_sops_1007_1_0.pdf"
// we need to be able to handle null values for effective / expiration dates and version as well

// I AM OMITING "RELATED DOCUMENTS" FROM THIS OBJECT BECAUSE IT HAS NOT BEEN CONFIGURED
// related documents is not neccessary for the "main document" page I am building
// BUT this endpoint will need to return them at some point

const documentData = {
  title: "Lender and Development Company Loan Programs",
  docType: "SOP", //this value will need to be converted into a taxonomy string with the fetchTaxonomy function in the facade
  docNumber: "10 07 1",
  summary: "Brief summary on the purpose of this SOP. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis.",
  body: "<p>This SOP applies to the administration of subsidiary corporations, partnerships, and assets of such SBICs which are acquired by the Agency or which come into the Agency's custody for the purpose of liquidation.</p> <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.</p><p>Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo.</p> ",
  program: ["SBIC", "7(a)"],
  activity: "Liquidation",
  files: [
    {
      url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf", //sample pdf until we figure out the pdf issue
      effectiveDate: "2007-12-21",
      expirationDate: "2018-07-21",
      version: "8" //no idea how this works... or how you can link ro previous versions. It's just a text field lol
    },
    {
      url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf",
      effectiveDate: "2003-10-22",
      expirationDate: "2017-12-17",
      version: "0" //should we return null for the properties that are empty? or empty string?
    }
  ],
  office: {
    uri: "https://www.sba.gov/offices/headquarters/ooi",
    title: "Office of Investment and Innovation"
  }
};

export default documentData;