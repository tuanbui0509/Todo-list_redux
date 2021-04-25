import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        // data of new or old task
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name === 'status')
            value = target.value === 'true' ? true : false;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        //unload website
        event.preventDefault();
        this.props.onSubmit(this.state);

        //cancel and close form
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }
    componentWillMount() {
        //if exits taskEditing update data
        if (this.props.taskEditing) {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        // taskEditing exit replace data
        if (nextProps && nextProps.taskEditing) {
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status,
            })
        }
        // taskEditing not exit then create new todo
        else if(!nextProps.taskEditing){
            this.setState({
                id: '',
                name: '',
                status: false,
            })
        }
    }

    render() {
        let { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <i
                        className="fa fa-times text-right"
                        onClick={this.onCloseForm}

                    ></i>
                    <h3 className="panel-title">{id !== '' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}</h3>

                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên công việc"
                                name="name"
                                required="required"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-warning"
                            >{id !== '' ? 'Cập Nhật' : 'Thêm'}</button>&nbsp;
                        <button
                                type="submit"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
