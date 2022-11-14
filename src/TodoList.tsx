import React from 'react';
import {TaskType} from './App';

type TodoListType = {
    title: string,
    tasks: Array<TaskType>
}


const TodoList = ({title, tasks}: TodoListType) => {

    const tasksElements = tasks.map(
        t => <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
            <button onClick={() => alert(t.id)}>X</button>
        </li>)

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;