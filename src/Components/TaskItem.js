import React, { Component } from 'react';
import { connect } from 'react-redux';
import *as actions from './../actions/index';

class TaskItem extends Component {

    onChangeStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onUpdateTask = () => {
        this.props.onEditTask(this.props.task);
        this.props.onOpenForm();
    }
    render() {

        let { task, index } = this.props;
        return (

            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        className={task.status ? "label label-success" : "label label-danger"}
                        onDoubleClick={this.onChangeStatus}
                    >
                        {task.status ? 'Kích hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.onUpdateTask}
                    >
                        <span className="fa fa-pencil mr-5" />Sửa
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDeleteTask}
                    >
                        <span className="fa fa-trash mr-5" />Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
