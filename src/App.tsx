import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';

//C - create
//R - read
//U - update
//D - delete

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    const todoListTitle: string = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (tId: string) => {
        const updatedTask = tasks.filter(task => task.id !== tId)
        setTasks(updatedTask)
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const changeTodoListFilter = (nexFilterValue: FilterValuesType) => {
        setFilter(nexFilterValue)
    }

    const getFilteredTasks =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {

            switch (filter) {
                case 'completed':
                    return tasks.filter(task => task.isDone)
                case 'active':
                    return tasks.filter(task => !task.isDone)
                default:
                    return tasks
            }
        }

    return (
        <div className="App">
            <TodoList
                addTask={addTask}
                tasks={getFilteredTasks(tasks, filter)}
                title={todoListTitle}
                filter={filter}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
