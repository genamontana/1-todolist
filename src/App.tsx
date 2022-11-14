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

function App() {

    const todoListTitle: string = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])

    const removeTask = (tId: number) => {
        const updatedTask = tasks.filter(task => task.id !== tId)
        setTasks(updatedTask)
    }


    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                title={todoListTitle}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
