import * as Enzyme from 'enzyme';
import * as React from 'react';
import { categories, fakeTasksList } from '../../services/__mocks__/getTasksList';
import { ITodo } from '../../typings';
import HomeContainer, { IState } from './index';

jest.mock('../../services/getTasksList');
const INITIAL_STATE: IState = {
  fetchLoading: true,
  categories:   [],
  currentTodo:  {
    category: '',
    dueDate:  '',
    id:       '',
    isActive: true,
    priority: 'low',
    task:     '',
  },
  error:        null,
  loading:      false,
  todoS:        [],
};
const updatedTodo: ITodo = {
  category: 'todoZ',
  dueDate:  '10/10/2018',
  id:       'fake1',
  isActive: true,
  priority: 'low',
  task:     'update a todo from the state',
};

describe('Home Container', () => {
  const wrapper = Enzyme.shallow(<HomeContainer />);
  it('should initial state', () => {
    const wrapper2 = Enzyme.shallow(<HomeContainer />);
    expect((wrapper2.state() as IState)).toEqual({ ...INITIAL_STATE });
  });
  it('should fetch task list and store it a the state and set the loading to false.', (done) => {
    (wrapper.instance() as HomeContainer).componentDidMount().then(() => {
      expect(wrapper.state() as IState).toEqual({
        ...INITIAL_STATE,
        categories:   [...categories],
        fetchLoading: false,
        todoS:        [...fakeTasksList],
      });
      done();
    });
  });
  it('should add new Item', (done) => {
    const newTodo: ITodo = {
      category: 'todoZ',
      dueDate:  '10/10/2018',
      id:       '',
      isActive: true,
      priority: 'high',
      task:     'add new todo',
    };
    (wrapper.instance() as HomeContainer).addTodo(newTodo).then(() => {
      expect((wrapper.state() as IState).todoS).toEqual([...fakeTasksList, { ...newTodo, id: '4' }]);
      done();
    });
  });
  it('should remove an item from todoS', (done) => {
    (wrapper.instance() as HomeContainer).removeTodo('4').then(() => {
      expect(wrapper.state() as IState).toEqual({
        ...INITIAL_STATE,
        categories,
        fetchLoading: false,
        loading:      false,
        todoS:        [...fakeTasksList],
      });
      done();
    });
  });
  it('should edit a todo', (done) => {
    (wrapper.instance() as HomeContainer).editTodo(updatedTodo).then(() => {
      expect(wrapper.state() as IState).toEqual({
        ...INITIAL_STATE,
        categories,
        fetchLoading: false,
        loading:      false,
        todoS:        [updatedTodo, { ...fakeTasksList[1] }, { ...fakeTasksList[2] }],
      });
      done();
    });
  });
  it('should toggle a todo', (done) => {
    (wrapper.instance() as HomeContainer).toggleTodo('fake1').then(() => {
      expect((wrapper.state() as IState as IState).todoS).toEqual([
        {
          ...updatedTodo,
          isActive: false,
        },
        { ...fakeTasksList[1] }, { ...fakeTasksList[2] }]);
      done();
    });
  });
  it('should select a todo', () => {
    (wrapper.instance() as HomeContainer).selectTodo('fake2');
    expect(wrapper.state() as IState).toEqual({
      ...INITIAL_STATE,
      categories,
      fetchLoading: false,
      currentTodo:  { ...fakeTasksList[1] },
      loading:      false,
      todoS:        [{ ...updatedTodo, isActive: false }, { ...fakeTasksList[1] }, { ...fakeTasksList[2] }],
    });
  });
  it('should add new category', (done) => {
    (wrapper.instance() as HomeContainer).addNewCategory('San Francisco Trip').then(() => {
      expect(wrapper.state() as IState).toEqual({
        ...INITIAL_STATE,
        fetchLoading: false,
        categories:   [...categories, 'San Francisco Trip'],
        currentTodo:  { ...fakeTasksList[1] },
        loading:      false,
        todoS:        [{ ...updatedTodo, isActive: false }, { ...fakeTasksList[1] }, { ...fakeTasksList[2] }],
      });
      done();
    });
  });
});
