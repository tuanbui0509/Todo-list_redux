import React, { Component } from 'react';
import TaskItem from './TaskItem';

//import store
import *as actions from './../actions/index';

import { connect } from 'react-redux'
class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1//all:-1, active: 1, not active: 0
    }
  }


  onChangeFilter = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    let filter = {
      name: name === 'filterName' ? value : this.state.filterName,
      status: name === 'filterStatus' ? value : this.state.filterStatus
    };
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value
    })


  }

  render() {
    let { tasks, filterTable, keyWord, sort } = this.props;
    console.log(sort)
    let { filterName, filterStatus } = this.state;

    tasks = tasks.filter((task) => {
      return task.name.toUpperCase().indexOf(keyWord.toUpperCase()) !== -1;
    });

    if (filterTable.name) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
      });
    }
    tasks = tasks.filter((task) => {
      if (filterTable.status === -1) {
        return task;
      }
      else {
        return task.status === (filterTable.status === 1 ? true : false);
      }
    });
    // ============== SORT ====================
    if (sort.by === 'name') {
      tasks.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return sort.value;
        else if (a.name.toLowerCase() < b.name.toLowerCase()) return -sort.value;
        else return 0;
      });

    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0;
      });
    }


    let elementTask = tasks.map((task, index) => {
      return <TaskItem
        key={task.id}
        index={index}
        task={task}
      />;
    });

    return (

      <div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="filterName"
                  value={filterName}
                  onChange={this.onChangeFilter}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  name="filterStatus"
                  value={filterStatus}
                  onChange={this.onChangeFilter}

                >
                  <option value={-1}>Tất Cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích Hoạt</option>
                </select>
              </td>
              <td />
            </tr>
            {/* Item */}
            {elementTask}
          </tbody>
        </table>
      </div>
    );
  }
}

// tạo kết nối lấy state trên store để truyền vào props
const mapStateProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyWord: state.searchTask,
    sort: state.sortTask
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTable(filter));
    }
  }
}
export default connect(mapStateProps, mapDispatchToProps)(TaskList);
