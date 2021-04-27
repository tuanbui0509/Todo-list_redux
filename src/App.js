import React, { Component } from 'react';
import TaskForm from './Components/TaskForm'
import TaskControl from './Components/TaskControl'
import TaskList from './Components/TaskList';
import './App.css';
// import _ from 'lodash'
// import demo from './trainning/demo';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisplayForm: false,
      taskEditing: null,
      sortBy: 'name',
      sortValue: 1,
      filter: {
        name: '',
        status: -1
      },
      keyWord: ''

    }
  }



  onToggleForm = () => {
    // Add task
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      })
    }
    else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      })
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onSubmit = (task) => {
    let { tasks } = this.state;
    if (task.id === '') {
      // Adding
      task.id = this.generateID();
      tasks.push(task);
    } else {
      //Editing
      let index = this.findIndex(task.id);
      tasks[index] = task;
    }

    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findIndex = (id) => {
    let { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, idx) => {
      if (task.id === id) result = idx;
    });
    return result;
  }

  onUpdateStatus = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1)
      tasks[index].status = !tasks[index].status;
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onDeleteTodo = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    console.log(index);
    if (index !== -1)
      tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateToDo = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    let taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    })

    this.onShowForm();
  }

  onChangeFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }
  searchKeyWord = (keyWord) => {
    this.setState({
      keyWord: keyWord
    })
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
  }

  render() {
    let { isDisplayForm, taskEditing,
      //  filter, keyWord, 
       sortBy, sortValue } = this.state; //let tasks = this.state.tasks
    // if (keyWord) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyWord) !== -1;
    //   });
    // }
    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     });
    //   }

    //   tasks = tasks.filter((task) => {
    //     if (filter.status === -1) {
    //       return task;
    //     }
    //     else {
    //       return task.status === (filter.status === 1 ? true : false);
    //     }
    //   });
    // }

    // if (sortBy === 'name') {
    //   // if (sortValue === 1) {
    //   //   tasks.reverse();
    //   // }else{
    //   //   tasks.sort();
    //   // }
    //   tasks.sort((a, b) => {
    //     if (a.name < b.name) return sortValue;
    //     else if (a.name > b.name) return -sortValue;
    //     else return 0;
    //   });

    // } else {
    //   tasks.sort((a, b) => {
    //     if (a.status < b.status) return sortValue;
    //     else if (a.status > b.status) return - sortValue;
    //     else return 0;
    //   });
    // }

    let elmTaskForm = isDisplayForm ?
      <TaskForm
        onCloseForm={this.onCloseForm}
        onSubmit={this.onSubmit}
        taskEditing={taskEditing}
      /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "col-xs-0 col-sm-0 col-md-0 col-lg-0"}>
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
              type="button"
              className="btn btn-primary mr-5"
              onClick={this.onToggleForm}

            >
              <span className="fa fa-plus mr-5" />Thêm Công Việc
        </button>

            <TaskControl
              searchKeyWord={this.searchKeyWord}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  // tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDeleteTodo={this.onDeleteTodo}
                  onUpdateToDo={this.onUpdateToDo}
                  onChangeFilter={this.onChangeFilter}
                ></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
