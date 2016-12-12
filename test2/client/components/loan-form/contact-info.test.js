import React from 'react';
import { mount, shallow } from 'enzyme';
import {should} from 'should';

import {ContactInfoForm}  from '../../../../src/client/components/loan-form/contact-info.jsx';

describe('<ContactInfoForm />', function () {
  it('should have one form', function () {
    const wrapper = shallow(<ContactInfoForm />);
    wrapper.find('form').should.have.length(1);
  });

});