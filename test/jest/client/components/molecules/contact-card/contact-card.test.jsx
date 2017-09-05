/*global expect*/

import React from 'react';
import ContactCard from 'client/components/molecules/contact-card/contact-card.jsx';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import _ from "lodash";

const card = {
  "type": "contact",
  "cdcNumber": "12345",
  "city": "Galactic City",
  "contactName": null,
  "email": "tarkin@deathstar.org",
  "firsNumber": "1234",
  "link": "http://starwars.wikia.com/wiki/Wilhuff_Tarkin",
  "phoneNumber": "123-456-5665",
  "state": "MD",
  "stateServed": "Maryland",
  "streetAddress": "123 Death Star Street, Suite 1",
  "category": "CDC/504",
  "zipCode": 12345,
  "title": "Grand Moff Tarkin",
  "id": 2974
};

describe("ContactCard", () => {
  test('should render with all the information', () => {
    let cardData = _.clone(card);
    const component = renderer.create(<ContactCard {...cardData}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render without an address ', () => {
    let cardData = _.omit(card, "streetAddress");
    const component = shallow(<ContactCard {...cardData}/>);
    expect(component.find(".contact-card-link-line")).toHaveLength(3);
    expect(component.find(".contact-card-plain-line")).toHaveLength(0);
  });

  test('should render without a zip code ', () => {
    let cardData = _.omit(card, "zipCode");
    const component = shallow(<ContactCard {...cardData}/>);
    expect(component.find(".contact-card-link-line")).toHaveLength(3);
    expect(component.find(".contact-card-plain-line")).toHaveLength(0);
  });

  test('should render without a phone number ', () => {
    let cardData = _.omit(card, "phoneNumber");
    const component = shallow(<ContactCard {...cardData}/>);
    expect(component.find(".contact-card-link-line")).toHaveLength(3);
    expect(component.find(".contact-card-plain-line")).toHaveLength(0);
  });

  test('should render without the state served (which is normally invisible)', () => {
    let cardData = _.omit(card, "stateServed");
    const component = shallow(<ContactCard {...cardData}/>);
    expect(component.find(".contact-card-link-line")).toHaveLength(4);
    expect(component.find(".contact-card-plain-line")).toHaveLength(0);
  });

})
