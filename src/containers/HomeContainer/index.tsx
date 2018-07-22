import * as React from 'react';
import TodoZ from '../../models/TodoZ';
import { ITodo } from '../../typings';
import TodoFormControl from './components/TodoFormControl';
import TodoListComponent from './components/TodoListComponent';

export interface IState {
  loading: boolean;
  fetchLoading: boolean;
  error: any;
  todoS: ITodo[];
  categories: string[];
  currentTodo: ITodo;
}

class HomeContainer extends React.Component<{}, IState> {
  private todoZModel: TodoZ;

  constructor(props: Readonly<{}>) {
    super(props);
    this.todoZModel = new TodoZ();
    this.state = {
      loading:      false,
      fetchLoading: true,
      error:        null,
      todoS:        this.todoZModel.todoS,
      categories:   this.todoZModel.categories,
      currentTodo:  {
        id:       '',
        priority: 'low',
        dueDate:  '',
        category: '',
        task:     '',
        isActive: true,
      },
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.fetchTodoSList();
  }

  public fetchTodoSList: () => Promise<void> = async () => {
    console.log('fetchTodoList at homeContainer start');
    try {
      await this.todoZModel.fetchTodoS();
      console.log('fetchTodoList at homeContainer successfully fetch data');
      this.setState(
        {
          todoS:      this.todoZModel.todoS,
          categories: this.todoZModel.categories,
        },
        () => console.log('fetchTodoList at homeContainer successfully store data at state'),
      );
    } catch (error) {
      console.log('fetchTodoList at homeContainer has a error');
      console.log(error);
      this.setState({ error });
    }
    finally {
      this.setState(
        { fetchLoading: false },
        () => console.log('fetchTodoList at homeContainer successfully set loading false at state'),
      );
      console.log('fetchTodoList at homeContainer end');
    }
  };

  public addTodo: (todo: ITodo) => Promise<void> = async (todo) => {
    try {
      await this.todoZModel.add(todo);
      console.log('addTodo on HomeContainer start');
      this.setState(
        { todoS: this.todoZModel.todoS },
        () => console.log('successfully store new todo on state'),
      );
    } catch (error) {
      console.log('addTodo at homeContainer has a error');
      console.log(error);
      this.setState({ error });
    }
    finally {
      console.log('addTodo on HomeContainer end');
    }
  };

  public removeTodo: (id: string) => Promise<void> = async (id) => {
    try {
      await this.todoZModel.remove(id);
      console.log('removeTodo on HomeContainer start');
      this.setState(
        { todoS: this.todoZModel.todoS },
        () => console.log('successfully removed a todo on state'),
      );
    } catch (error) {
      console.log('removeTodo has an error');
      console.log(error);
      this.setState({ error });
    }
    finally {
      console.log('removeTodo on HomeContainer end');
    }

  };

  public editTodo: (todo: ITodo) => Promise<void> = async (todo) => {
    try {
      await this.todoZModel.update(todo);
      console.log('editTodo on HomeContainer start');
      this.setState(
        { todoS: this.todoZModel.todoS },
        () => console.log('successfully updated todo in the sate'),
      );
    } catch (error) {
      console.log('editTodo has an error');
      console.log(error);
      this.setState({ error });
    }
    finally {
      console.log('editTodo on HomeContainer end');
    }
  };

  public toggleTodo: (id: string) => Promise<void> = async (id) => {
    try {
      await this.todoZModel.toggle(id);
      console.log('toggleTodo on HomeContainer start');
      this.setState(
        { todoS: this.todoZModel.todoS },
        () => console.log('successfully toggle todo in the sate'),
      );
    } catch (error) {
      console.log('toggleTodo has an error');
      console.log(error);
      this.setState({ error });
    }
    finally {
      console.log('toggleTodo on HomeContainer end');
    }
  };

  public selectTodo: (id: string) => void = (id) => {
    console.log('selectTodo on HomeContainer start');
    this.setState(
      { currentTodo: this.todoZModel.getTodoById(id) },
      () => console.log('successfully update currentTodo in the sate'),
    );
    console.log('selectTodo on HomeContainer end');
  };

  public addNewCategory: (category: string) => Promise<void> = async (category) => {
    try {
      await this.todoZModel.addCategory(category);
      console.log('addNewCategory on HomeContainer start');
      this.setState(
        { categories: this.todoZModel.categories },
        () => console.log('successfully add new category to the state'),
      );
    } catch (error) {
      console.log('addNewCategory has an error');
      console.log(error);
      this.setState({ error });
    }
    finally {
      console.log('addNewCategory on HomeContainer end');
    }
  };

  public reInit: () => void = () => {
    this.setState({
      currentTodo: {
        id:       '',
        priority: 'low',
        dueDate:  '',
        category: '',
        task:     '',
        isActive: true,
      },
    });
  };

  public render(): JSX.Element {
    const { categories, currentTodo, todoS } = this.state;
    return (
      <React.Fragment>
        <TodoFormControl
          initialValues={currentTodo}
          categories={categories}
          addTodo={this.addTodo}
          addNewCategory={this.addNewCategory}
          reInit={this.reInit}
          editTodo={this.editTodo}
        />
        <TodoListComponent
          list={todoS}
          categories={categories}
          removeTodo={this.removeTodo}
          toggleTodo={this.toggleTodo}
          selectTodo={this.selectTodo}
        />
      </React.Fragment>
    );
  }
}

export default HomeContainer;
