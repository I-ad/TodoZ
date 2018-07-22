import * as Enzyme from 'enzyme';
import * as React from 'react';
import { ITodo } from '../../../../typings';

import TodoFormControl, { IProps, IState } from './index';

describe('Todo Form Control', () => {
  const PROPS: IProps = {
    addNewCategory: (category: string) => new Promise(resolve => null),
    addTodo:        (todo: ITodo) => new Promise(resolve => null),
    categories:     ['Work', 'General'],
    editTodo:       (todo: ITodo) => new Promise(resolve => null),
    initialValues:  {
      category: '',
      dueDate:  '',
      id:       '',
      isActive: true,
      priority: 'low',
      task:     '',
    },
    reInit:         () => null,
  };
  const INITIAL_STATE: IState = {
    category:    {
      error:     'please select one',
      isTouched: false,
      value:     PROPS.initialValues.category,
    },
    dueDate:     {
      error:     '',
      isTouched: false,
      value:     PROPS.initialValues.dueDate,
    },
    isSubmitted: false,
    newCategory: {
      error:     '',
      isTouched: false,
      value:     '',
    },
    priority:    {
      error:     '',
      isTouched: false,
      value:     PROPS.initialValues.priority,
    },
    task:        {
      error:     'this field required',
      isTouched: false,
      value:     PROPS.initialValues.task,
    },
  };
  const wrapper = Enzyme.shallow
                         (<TodoFormControl
                           initialValues={PROPS.initialValues}
                           categories={PROPS.categories}
                           addTodo={PROPS.addTodo}
                           addNewCategory={PROPS.addNewCategory}
                           reInit={PROPS.reInit}
                           editTodo={PROPS.editTodo}
                         />);
  it('should initial state', () => {
    expect(wrapper.state()).toEqual(INITIAL_STATE);
  });
  it('should update priority value', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: 'mid', name: 'priority' } });
    expect((wrapper.state() as IState).priority).toEqual({ error: '', value: 'mid', isTouched: true });
  });
  it('should return error when invalid priority', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: 'invalid text', name: 'priority' } });
    expect((wrapper.state() as IState).priority).toEqual({
      error:     'chose low or mid or high',
      isTouched: true,
      value:     'invalid text',
    });
  });
  it('should update dueDate value', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: '10/10/2018', name: 'dueDate' } });
    expect((wrapper.state() as IState).dueDate).toEqual({ error: '', value: '10/10/2018', isTouched: true });
  });
  it('should return error when invalid dueDate', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: 'invalid text', name: 'dueDate' } });
    expect((wrapper.state() as IState).dueDate).toEqual({
      error:     'invalid date',
      isTouched: true,
      value:     'invalid text',
    });
  });
  it('should update category value', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: 'Work', name: 'category' } });
    expect((wrapper.state() as IState).category).toEqual({ error: '', value: 'Work', isTouched: true });
  });
  it('should return error when invalid category', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: '', name: 'category' } });
    expect((wrapper.state() as IState).category).toEqual({
      error:     'please select one',
      isTouched: true,
      value:     '',
    });
  });
  it('should update newCategory value', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: 'trips', name: 'newCategory' } });
    expect((wrapper.state() as IState).newCategory).toEqual({ error: '', value: 'trips', isTouched: true });
  });
  it('should return error when length < 2 ', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: 'A', name: 'newCategory' } });
    expect((wrapper.state() as IState).newCategory).toEqual({
      error:     'minimum 3 Letters',
      isTouched: true,
      value:     'A',
    });
  });
  it('should return error when newCategory exist ', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: 'Work', name: 'newCategory' } });
    expect((wrapper.state() as IState).newCategory).toEqual({
      error:     'category already exist',
      isTouched: true,
      value:     'Work',
    });
  });
  it('should update task value', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: 'get some sleep.', name: 'task' } });
    expect((wrapper.state() as IState).task).toEqual({ error: '', value: 'get some sleep.', isTouched: true });
  });
  it('should return error when length < 2 ', () => {
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: 'A', name: 'task' } });
    expect((wrapper.state() as IState).task).toEqual({
      error:     'minimum 2 Letters',
      isTouched: true,
      value:     'A',
    });
  });
  it('should return error when length > 20 ', () => {
    const LONG_TEXT = 'I could trace the years of my childhood in the warm, Sacramento sun back to a single name, it would be R.J. Rushdoony — the father of Christian Reconstructionism, and, by many people’s definition, the strongest inspiration for the modern Christian homeschool movement.';
    (wrapper.instance() as TodoFormControl).onChange({ target: { value: LONG_TEXT, name: 'task' } });
    expect((wrapper.state() as IState).task).toEqual({
      error:     'maximum 120 Letters',
      isTouched: true,
      value:     LONG_TEXT,
    });
  });
});
