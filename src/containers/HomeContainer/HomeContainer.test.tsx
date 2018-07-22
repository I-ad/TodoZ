import * as Enzyme from 'enzyme';
import * as React from 'react';
import HomeContainer, { IState } from './index';

const wrapper = Enzyme.shallow(<HomeContainer />);
it('should initial state', () => {
  expect(wrapper.state() as IState).toEqual({
    loading:      false,
    fetchLoading: true,
    error:       null,
    todoS:        [],
    categories:   [],
    currentTodo:  {
      id:       '',
      priority: 'low',
      dueDate:  '',
      category: '',
      task:     '',
      isActive: true,
    },
  });
});
