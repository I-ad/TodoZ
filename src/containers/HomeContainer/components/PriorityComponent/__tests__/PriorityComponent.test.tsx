import * as Enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import PriorityComponent from '../index';

it('should render correctly', () => {
  const onChange = () => null;
  const wrapper = Enzyme.shallow(
    <PriorityComponent
      value="low"
      error="error"
      isTouched={true}
      isSubmitted={true}
      onChange={onChange}
    />);
  expect(toJson(wrapper)).toMatchSnapshot();
}); 
