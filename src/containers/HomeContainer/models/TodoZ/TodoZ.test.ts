import { fakeTasksList } from '../../../../services/__mocks__/getTasksList';
import { ITodo } from '../../../../typings/index';
import TodoZ from './index';

jest.mock('../../../../services/getTasksList');

const TodoSList: ITodo[] = [{
  id:       '1',
  priority: 'low',
  dueDate:  '10/10/2018',
  category: 'Work',
  task:     'get Work Done.',
  isActive: true,
}];

const updatedTodo = {
  id:       'fake1',
  priority: 'low',
  dueDate:  '10/10/2018',
  category: 'Work',
  task:     'get Work Done ASAP.',
  isActive: true,
};

// const toggledTodo = {
//   id:       '1',
//   priority: 'low',
//   dueDate:  '10/10/2018',
//   category: 'Work',
//   task:     'get Work Done ASAP.',
//   isActive: false,
// };
//
const newTodo: ITodo = {
  id:       '',
  priority: 'mid',
  dueDate:  '',
  category: 'General',
  task:     'get Gas',
  isActive: true,
};

const categoriesList = ['Trips', 'Home'];

describe('TodoZ', () => {
  const TodoZModel = new TodoZ();
  it('should initial', () => {
    // expect(TodoZModel.todoS).toEqual([]);
    // expect(TodoZModel.categories).toEqual([]);
  });
  it('should set todoS', () => {
    TodoZModel.todoS = [...TodoSList];
    expect(TodoZModel.todoS).toEqual([...TodoSList]);
  });
  it('should set categories', () => {
    TodoZModel.categories = [...categoriesList];
    expect(TodoZModel.categories).toEqual([...categoriesList]);
  });
  it('should fetch new data', async (done) => {
    TodoZModel.fetchTodoS().then(() => {
      expect(TodoZModel.todoS).toEqual([...fakeTasksList]);
      expect(TodoZModel.categories).toEqual(['Work', 'General', 'trips']);
      done();
    });
  });
  it('should add new todo', async (done) => {
    TodoZModel.add({ ...newTodo }).then(() => {
      expect(TodoZModel.todoS).toEqual([...fakeTasksList, { ...newTodo, id: '4' }]);
      done();
    });
  });
  it('should remove todo', (done) => {
    TodoZModel.remove('fake2').then(() => {
      expect(TodoZModel.todoS).toEqual([
        ...fakeTasksList.filter((item) => item.id !== 'fake2'),
        { ...newTodo, id: '4' },
      ]);
      done();
    });
  });
  it('should update todo', (done) => {
    TodoZModel.update(updatedTodo).then(() => {
      expect(TodoZModel.todoS).toEqual([
        { ...updatedTodo },
        ...fakeTasksList.filter((item) => {
          if (item.id === 'fake2') {
            return false;
          } else if (item.id === 'fake1') {
            return false;
          }
          return true;
        }),
        { ...newTodo, id: '4' },
      ]);
      done();
    });
  });
  it('should toggle todo', (done) => {
    TodoZModel.toggle('fake1').then(() => {
      expect(TodoZModel.todoS).toEqual([
        { ...updatedTodo, isActive: false },
        ...fakeTasksList.filter((item) => {
          if (item.id === 'fake2') {
            return false;
          } else if (item.id === 'fake1') {
            return false;
          }
          return true;
        }),
        { ...newTodo, id: '4' },
      ]);
      done();
    });
  });
  it('should add new category', (done) => {
    TodoZModel.addCategory('sport').then(() => {
      expect(TodoZModel.categories).toEqual(['Work', 'General', 'trips', 'sport']);
      done();
    });
  });
});
