import React, { Component } from 'react';

class TaskSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyWord: ''
        }
    }

    onChangeSearch = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSearchKeyWord = () => {
       this.props.searchKeyWord(this.state.keyWord);
    }
    render() {
        return (
            <div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập từ khóa..."
                            name='keyWord'
                            value={this.state.keyWord}
                            onChange={this.onChangeSearch}
                        />
                        <span className="input-group-btn">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={this.onSearchKeyWord}
                            >
                                <span className="fa fa-search mr-5" />Tìm kiếm
                </button>
                        </span>
                    </div>
                </div>

            </div>
        );
    }
}

export default TaskSearch;
