import React, { Component } from 'react';
import { connect } from 'react-redux';
import *as actions from './../actions/index';

class TaskItem extends Component {

    onChangeStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDeleteTodo = () => {
        this.props.onDeleteTodo(this.props.task.id);
    }

    onUpdateToDo = () => {
        this.props.onUpdateStatus(this.props.task.id);
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
                        onClick={this.onUpdateToDo}
                    >
                        <span className="fa fa-pencil mr-5" />Sửa
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDeleteTodo}
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
        onUpdateStatus:(id)=>{
            dispatch(actions.updateStatus(id));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
