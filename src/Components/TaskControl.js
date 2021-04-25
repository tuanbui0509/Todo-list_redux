import React, { Component } from 'react';
import TaskSearch from './TaskSearch'
import TaskSort from './TaskSort'
class TaskControl extends Component {
    render() {
        return (
            <div className="row mt-15">
                <div>
                    <TaskSearch searchKeyWord={this.props.searchKeyWord} />
                    <TaskSort
                        onSort={this.props.onSort}
                        sortBy={this.props.sortBy}
                        sortValue={this.props.sortValue}
                    />

                </div>
            </div>
        );
    }
}

export default TaskControl;
