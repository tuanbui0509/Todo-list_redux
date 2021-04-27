import React, { Component } from 'react';
import TaskForm from './Components/TaskForm'
import TaskControl from './Components/TaskControl'
import TaskList from './Components/TaskList';
import './App.css';
// import _ from 'lodash'
// import demo from './trainning/demo';
import { connect } from 'react-redux'

// actions
import *as actions from './actions/index'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // isDisplayForm: false,
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
    // if (this.state.isDisplayForm && this.state.taskEditing !== null) {
    //   this.setState({
    //     isDisplayForm: true,
    //     taskEditing: null
    //   })
    // }
    // else {
    //   this.setState({
    //     isDisplayForm: !this.state.isDisplayForm,
    //     taskEditing: null
    //   })
    // }
    this.props.onToggleForm();
  }

 
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  // onSubmit = (task) => {
  //   let { tasks } = this.state;
  //   if (task.id === '') {
  //     // Adding
  //     task.id = this.generateID();
  //     tasks.push(task);
  //   } else {
  //     //Editing
  //     let index = this.findIndex(task.id);
  //     tasks[index] = task;
  //   }

  //   this.setState({
  //     tasks: tasks,
  //     taskEditing: null
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  findIndex = (id) => {
    let { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, idx) => {
      if (task.id === id) result = idx;
    });
    return result;
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
    let {
      // isDisplayForm, 
      taskEditing,
      //  filter, keyWord, 
      sortBy, sortValue } = this.state; //let tasks = this.state.tasks
    let { isDisplayForm } = this.props;
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

    // let elmTaskForm = isDisplayForm ?
    //   <TaskForm
    //     taskEditing={taskEditing}
    //   /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "col-xs-0 col-sm-0 col-md-0 col-lg-0"}>
          <TaskForm taskEditing={taskEditing} />
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
                  // onUpdateToDo={this.onUpdateToDo}
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

const mapStateToProps = state => {
  return {
    // props từ reducer
    isDisplayForm: state.isDisplayForm
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
