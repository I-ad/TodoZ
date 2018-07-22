import { ITodo } from '../../typings';

export const fakeTasksList: ITodo[] = [
  {
    category: 'Work',
    dueDate:  '10/10/2018',
    id:       'fake1',
    isActive: true,
    priority: 'low',
    task:     'mock-up new project.',
  },
  {
    category: 'San Francisco trip',
    dueDate:  '11/10/2018',
    id:       'fake2',
    isActive: true,
    priority: 'mid',
    task:     'rent a car and book a hotel room.',
  },
  {
    category: 'general',
    dueDate:  '12/10/2018',
    id:       'fake3',
    isActive: false,
    priority: 'high',
    task:     'clean my room.',
  },
];
export const categories: string[] = ['Work', 'General', 'trips'];
export const getTasksList = async () => {
  return await new Promise(resolve => {
    resolve({
      categories,
      todoS: fakeTasksList,
    });
  });
};

export const addNewItemToTaskList: (item: ITodo) => Promise<any> = async (item: any) => {
  return await new Promise((resolve) => {
    resolve({ ...item, id: '4' });
  });
};

export const removeItemFromTaskList: (id: string) => Promise<any> = async (id) => {
  return await new Promise((resolve) => {
    resolve(id);
  });
};

export const updateItemOnTaskList: (item: ITodo) => Promise<any> = async (item) => {
  return new Promise((resolve) => {
    resolve(item)
  });
};

export const AddNewItemToCategoryList: (item: string) => Promise<any> = async (item) => {
  return new Promise((resolve) => {
    resolve(item);
  });
};
