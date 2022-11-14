import React from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (tId: number) => void
    changeTodoListFilter: (nexFilterValue:FilterValuesType)=>void
}


const TodoList = ({title, tasks, removeTask,changeTodoListFilter}: TodoListType) => {

    const tasksElements = tasks.map(
        t => <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
            <button onClick={() => removeTask(t.id)}>X</button>
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
                <button onClick={()=>changeTodoListFilter('all')}>All</button>
                <button onClick={()=>changeTodoListFilter('active')}>Active</button>
                <button onClick={()=>changeTodoListFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;