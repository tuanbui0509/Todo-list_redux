import React, { Component } from 'react';
import TaskSearch from './TaskSearch'
import TaskSort from './TaskSort'
class TaskControl extends Component {
    render() {
        return (
            <div className="row mt-15">
                <div>
                    <TaskSearch/>
                    <TaskSort/>

                </div>
            </div>
        );
    }
}

export default TaskControl;
