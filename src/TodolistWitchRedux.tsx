import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {SuperCheckBox} from './components/SuperCheckBox';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function TodolistWitchRedux(props: PropsType) {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }

    const removeTodolist = () => {
        dispatch(removeTodoListAC(props.id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(props.id, title))
    }

    const onAllClickHandler = () => dispatch(changeTodoListFilterAC(props.id, 'all'));
    const onActiveClickHandler = () => dispatch(changeTodoListFilterAC(props.id, 'active'));
    const onCompletedClickHandler = () => dispatch(changeTodoListFilterAC(props.id, 'completed'));

    const changeStatusHandler = (tId: string, checkedValue: boolean) => {
        dispatch(changeTaskStatusAC(tId, checkedValue, props.id))
    }

    if (props.filter === 'active') {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone === true);
    }

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
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                    }


                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <SuperCheckBox isDone={t.isDone}
                                       callBack={(checkedValue) => changeStatusHandler(t.id, checkedValue)}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
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
}


