import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ITodo } from '../../../../typings';

interface IProps {
  list: ITodo[];
  categories: string[];

  removeTodo(id: string): Promise<void>;

  toggleTodo(id: string): Promise<void>;

  selectTodo(id: string): void;
}

interface IState {
  priorityValue: string;
  dueDateValue: string;
  categoryValue: string;
  searchValue: string;
}

class TodoListComponent extends React.Component<IProps, IState> {
  public static propTypes = {
    list:       PropTypes.array.isRequired,
    removeTodo: PropTypes.func.isRequired,
    selectTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      categoryValue: '',
      dueDateValue:  '',
      priorityValue: '',
      searchValue:   '',
    };
  }

  public handleOnRemove: (e: any) => Promise<void> = async (e) => {
    await this.props.removeTodo(e.target.value);
  };
  public handleOnSelect: (e: any) => Promise<void> = async (e) => {
    await this.props.selectTodo(e.target.value);
  };

  public handleOnToggle: (e: any) => void = async (e) => {
    await this.props.toggleTodo(e.target.value);
  };

  public onChange = (e: any) => {
    const name: 'priorityValue' = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  };

  public render(): JSX.Element {
    const { list } = this.props;
    const { priorityValue, categoryValue, dueDateValue, searchValue } = this.state;
    const filteredList: () => ITodo[] = () => {
      let LIST: ITodo[] = list;
      if (priorityValue) {
        LIST = LIST.filter(item => item.priority === priorityValue);
      }
      if (categoryValue) {
        LIST = LIST.filter(item => item.category === categoryValue);
      }
      if (dueDateValue) {
        LIST = LIST.filter(item => item.dueDate === dueDateValue);
      }
      if (searchValue) {
        LIST = LIST.filter(item => item.task.indexOf(searchValue) !== -1);
      }
      return LIST;
    };
    return (
      <React.Fragment>
        <div>
          <select name="priorityValue" value={priorityValue} onChange={this.onChange}>
            <option value="">all</option>
            <option value="low">low</option>
            <option value="mid">mid</option>
            <option value="high">high</option>
          </select>
          <select name="categoryValue" value={categoryValue} onChange={this.onChange}>
            <option value="">all</option>
            {this.props.categories.map(item => (
              <option key={`list${item}`} value={item}>{item}</option>
            ))}
          </select>
          <input name="dueDateValue" type="text" value={dueDateValue} onChange={this.onChange} />
          <input name="searchValue" type="text" value={searchValue} onChange={this.onChange} />
        </div>
        <ul>
          {filteredList().map(item => (
            <li key={item.id}>
              <input type="checkbox" value={item.id} onChange={this.handleOnToggle} checked={!item.isActive} />
              <div>
                {item.task}
                <p>{`category: ${item.category}`}</p>
                <p>{`due date: ${item.dueDate}`}</p>
              </div>
              <button value={item.id} onClick={this.handleOnSelect}>edit</button>
              <button value={item.id} onClick={this.handleOnRemove}>delete</button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default TodoListComponent;
