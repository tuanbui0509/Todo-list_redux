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
    let { taskEditing } = this.props;
    if (taskEditing && taskEditing.id !== '') {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
    this.props.onClearTask('');

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
      //  filter, keyWord, 
      sortBy, sortValue } = this.state; //let tasks = this.state.tasks
    let { isDisplayForm } = this.props;
   

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
            <TaskForm />
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
                <TaskList/>
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
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
