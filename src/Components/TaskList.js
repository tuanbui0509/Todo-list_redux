import React, { Component } from 'react';
import TaskItem from './TaskItem';
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
    this.props.onChangeFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus);
    this.setState({
      [name]: value
    })


  }

  render() {

    let { tasks } = this.props;
    let { filterName, filterStatus } = this.state;
    let elementTask = tasks.map((task, index) => {
      return <TaskItem
        key={task.id}
        index={index}
        task={task}
        onUpdateStatus={this.props.onUpdateStatus}
        onDeleteTodo={this.props.onDeleteTodo}
        onUpdateToDo={this.props.onUpdateToDo}

      />;
    })
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

export default TaskList;
