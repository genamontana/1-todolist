import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);


    let tasks = props.tasks;

    if (props.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }

    const changeStatusHandler = useCallback((tId: string, checkedValue: boolean) => {
        props.changeTaskStatus(tId, checkedValue, props.id)
    }, [props.changeTaskStatus, props.id])
    const removeTask = useCallback((tasksId: string) => {
        props.removeTask(tasksId, props.id)
    }, [props.removeTask, props.id])
    const changeTaskTitle = useCallback((tasksId: string, newValue: string) => {
        props.changeTaskTitle(tasksId, newValue, props.id);
    }, [props.changeTaskTitle, props.id])


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete"
                        onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasks.map(t => {
                    return <Task key={t.id}
                                 task={t}
                                 changeTaskStatus={changeStatusHandler}
                                 removeTask={removeTask}
                                 changeTaskTitle={changeTaskTitle}/>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    color="success"
                    onClick={onAllClickHandler}>
                All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                    color="error"
                    onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    color="secondary"
                    onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
})


