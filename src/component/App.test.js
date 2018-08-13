import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

it('Link changes the class when hovered', () => {
  const component = renderer.create(<div />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});a