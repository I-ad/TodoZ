import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ITodo } from '../../../../typings';
import PriorityComponent from '../PriorityComponent';

interface IFormInput {
  value: string;
  error: string;
  isTouched: boolean;
}

export interface IProps {
  initialValues: ITodo;
  categories: string[];

  addTodo(todo: ITodo): Promise<void>;

  addNewCategory(category: string): Promise<void>;

  reInit(): void;

  editTodo(todo: ITodo): Promise<void>;
}

export interface IState {
  priority: IFormInput;
  dueDate: IFormInput;
  category: IFormInput;
  newCategory: IFormInput;
  task: IFormInput;
  isSubmitted: boolean;
}

class TodoFormControl extends React.Component<IProps, IState> {
  public static propTypes = {
    initialValues:  PropTypes.object.isRequired,
    categories:     PropTypes.arrayOf(PropTypes.string).isRequired,
    addTodo:        PropTypes.func.isRequired,
    addNewCategory: PropTypes.func.isRequired,
    reInit:         PropTypes.func.isRequired,
    editTodo:       PropTypes.func.isRequired,
  };

  constructor(props: IProps) {
    super(props);
    this.state = this.initialFormValues();
  }

  public componentWillUpdate(nextProps: Readonly<IProps>): void {
    if ((nextProps.initialValues.id !== this.props.initialValues.id)) {
      this.setState(this.initialFormValues);
    }
  }

  public initialFormValues: () => IState = () => {
    const { initialValues: { priority, dueDate, category, task } } = this.props;
    return {
      category:    {
        error:     this.categoryValidation(category),
        isTouched: false,
        value:     category,
      },
      dueDate:     {
        error:     this.dueDateValidation(dueDate),
        isTouched: false,
        value:     dueDate,
      },
      isSubmitted: false,
      newCategory: {
        error:     this.newCategoryValidation(''),
        isTouched: false,
        value:     '',
      },
      priority:    {
        error:     this.priorityValidation(priority),
        isTouched: false,
        value:     priority,
      },
      task:        {
        error:     this.taskValidation(task),
        isTouched: false,
        value:     task,
      },
    };
  };

  public addNewCategory: () => void = async () => {
    const { newCategory: { error, value } } = this.state;
    if (error === '' && value !== '') {
      await this.props.addNewCategory(value);
      this.setState({
        category: {
          error:     '',
          isTouched: false,
          value,
        },
      });
      this.setState({
        newCategory: {
          error:     '',
          isTouched: false,
          value:     '',
        },
      });
    }
  };

  public resetForm = () => {
    this.setState(this.initialFormValues());
  };

  public onChange = (e: any) => {
    const name: 'priority' = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: {
        error:     this[`${name}Validation`](value),
        isTouched: true,
        value,
      },
    })
  };

  public priorityValidation: (value: string) => string = (value) => {
    let error = '';
    if (value === 'low') {
      error = '';
    } else if (value === 'mid') {
      error = '';
    } else if (value === 'high') {
      error = '';
    } else {
      error = 'chose low or mid or high';
    }
    return error;
  };

  public dueDateValidation: (value: string) => string = (value) => {
    let error = '';
    if (value) {
      const valueDate = moment(value, 'MM/DD/YYYY');
      const format = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      if (valueDate.isValid()) {
        error = '';
      }
      if ((valueDate.diff(moment(), 'days')) < 0) {
        error = 'you cant change the past';
      }
      if ((valueDate.diff(moment(), 'month')) > 12) {
        error = 'maximum one Year';
      }
      if (value === '') {
        error = '';
      }
      if ((!valueDate.isValid() || !format.test(value)) && value !== '') {
        error = 'invalid date';
      }
    } else {
      error = '';
    }
    return error;
  };

  public categoryValidation: (value: string) => string = (value) => {
    let error = '';
    if (!value) {
      error = 'please select one';
    } else {
      error = '';
    }
    return error;
  };

  public newCategoryValidation: (value: string) => string = (value) => {
    let error = '';
    const index = this.props.categories.indexOf(value);
    if (value.length <= 2 && value.length > 0) {
      error = 'minimum 3 Letters';
    } else if (index > -1) {
      error = 'category already exist';
    } else {
      error = '';
    }
    return error;
  };

  public taskValidation: (value: string) => string = (value) => {
    let error = '';
    if (!value) {
      error = 'this field required';
    } else if (value.length < 2) {
      error = 'minimum 2 Letters';
    } else if (value.length > 120) {
      error = 'maximum 120 Letters';
    } else {
      error = '';
    }
    return error;
  };

  public handleUpdate: (todo: ITodo) => Promise<void> = async (todo) => {
    await this.props.editTodo(todo);
  };
  public handleOnAddTodo: (todo: ITodo) => Promise<void> = async (todo) => {
    await this.props.addTodo(todo);
  };
  public handleSubmit: (e: any) => Promise<void> = async (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });
    const { priority, dueDate, category, newCategory, task } = this.state;
    const isFormValid: boolean = priority.error.length === 0
      && dueDate.error.length === 0
      && category.error.length === 0
      && newCategory.error.length === 0
      && task.error.length === 0;
    const todo = {
      category: e.target.category.value,
      dueDate:  e.target.dueDate.value,
      id:       this.props.initialValues.id,
      isActive: true,
      priority: e.target.priority.value,
      task:     e.target.task.value,
    };
    if (isFormValid && this.props.initialValues.id === '') {
      await this.handleOnAddTodo(todo);
      this.resetForm();
    } else if (isFormValid && this.props.initialValues.id !== '') {
      await this.handleUpdate(todo);
      this.props.reInit();
    }
  };

  public render(): JSX.Element {
    const { priority, dueDate, category, newCategory, task, isSubmitted } = this.state;
    const { initialValues: { id }, reInit } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <PriorityComponent
          value={priority.value}
          error={priority.error}
          isTouched={priority.isTouched}
          isSubmitted={isSubmitted}
          onChange={this.onChange}
        />
        <div>
          <label>due date</label>
          <input name="dueDate" type="text" value={dueDate.value} onChange={this.onChange} />
          <p>{(dueDate.isTouched || isSubmitted) && dueDate.error}</p>
        </div>
        <div>
          <label>due date</label>
          <select name="category" value={category.value} onChange={this.onChange}>
            <option />
            {this.props.categories.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <p>{(category.isTouched || isSubmitted) && category.error}</p>
        </div>
        <div>
          <label>new category</label>
          <input name="newCategory" type="text" value={newCategory.value} onChange={this.onChange} />
          <button type="button" onClick={this.addNewCategory}>add new category</button>
          <p>{(newCategory.isTouched || isSubmitted) && newCategory.error}</p>
        </div>
        <div>
          <label>task</label>
          <textarea name="task" value={task.value} onChange={this.onChange} />
          <p>{(task.isTouched || isSubmitted) && task.error}</p>
        </div>
        {id === '' ? (
          <div>
            <button type="button" onClick={this.resetForm}>Clear</button>
            <button type="submit">add</button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={reInit}>cancel</button>
            <button type="submit">save</button>
          </div>
        )}
      </form>
    );
  }
}

export default TodoFormControl;
