import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListType = {
    title: string,
    tasks: Array<TaskType>
    addTask: (tittle: string) => void
    removeTask: (tId: string) => void
    changeTodoListFilter: (nexFilterValue: FilterValuesType) => void
}


const TodoList = ({addTask, title, tasks, removeTask, changeTodoListFilter}: TodoListType) => {

        const [tit, setTit] = useState<string>('')

        const tasksElements = tasks.map(
            t => <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={() => removeTask(t.id)}>X</button>
            </li>)

        const addTasks = () => {
            addTask(tit)
            setTit('')

        }

        const SetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setTit(e.currentTarget.value)

        const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                addTasks()
            }
        }

        const onClickHandlerCreator = (filter: FilterValuesType) => () => changeTodoListFilter(filter)

        return (
            <div>
                <h3>{title}</h3>
                <div>
                    <input
                        value={tit}
                        onKeyDown={onEnterAddTask}
                        onChange={SetLocalTitle}/>
                    <button onClick={addTasks}>+
                    </button>
                </div>
                <ul>
                    {tasksElements}
                </ul>
                <div>
                    <button onClick={onClickHandlerCreator('all')}>All</button>
                    <button onClick={onClickHandlerCreator('active')}>Active</button>
                    <button onClick={onClickHandlerCreator('completed')}>Completed</button>
                </div>
            </div>
        );
    }
;

export default TodoList;