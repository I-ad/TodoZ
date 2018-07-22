import { v4 } from 'uuid';
import { ITodo } from '../typings';

const todoS: ITodo[] = [
  {
    category: 'Work',
    dueDate:  '10/10/2018',
    id:       '1',
    isActive: true,
    priority: 'low',
    task:     'mock-up new project.',
  },
  {
    category: 'San Francisco trip',
    dueDate:  '11/10/2018',
    id:       '2',
    isActive: true,
    priority: 'mid',
    task:     'rent a car and book a hotel room.',
  },
  {
    category: 'general',
    dueDate:  '12/10/2018',
    id:       '3',
    isActive: false,
    priority: 'high',
    task:     'call dad.',
  },
];
const categories: string[] = ['Work', 'General'];
export const getTasksList = async (): Promise<any> => {
  return await new Promise(resolve => {
    setTimeout(() => resolve({
      categories,
      todoS,
    }), 2000);
  });
};

export const addNewItemToTaskList: (item: ITodo) => Promise<any> = async (item) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...item, id: v4() }), 2000);
  });
};

export const removeItemFromTaskList: (id: string) => Promise<any> = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(id), 2000);
  });
};

export const updateItemOnTaskList: (item: ITodo) => Promise<any> = async (item) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(item), 2000);
  });
};

export const AddNewItemToCategoryList: (item: string) => Promise<any> = async (item) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(item), 2000);
  });
};
