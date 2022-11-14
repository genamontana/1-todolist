import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';

//C - create
//R - read
//U - update
//D - delete

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todoListTitle: string = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (tId: number) => {
        const updatedTask = tasks.filter(task => task.id !== tId)
        setTasks(updatedTask)
    }

    const changeTodoListFilter = (nexFilterValue:FilterValuesType)=>{
        setFilter(nexFilterValue)
    }

    let tasksForRender: Array<TaskType> = [];
        if(filter === 'all'){
            tasksForRender = tasks
        }else if (filter === 'active'){
            tasksForRender = tasks.filter(task => task.isDone === false)
        }else if(filter === 'completed'){
            tasksForRender = tasks.filter(task => task.isDone === true)
        }


    return (
        <div className="App">
            <TodoList
                tasks={tasksForRender}
                title={todoListTitle}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
