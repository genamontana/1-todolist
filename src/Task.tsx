import React, {memo} from 'react';
import {SuperCheckBox} from './components/SuperCheckBox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from './TodolistWitchRedux';

type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean) => void
    removeTask: (taskId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = memo(({
                              task,
                              changeTaskStatus,
                              removeTask,
                              changeTaskTitle
                          }: TaskPropsType) => {

    const changeStatusHandler = (tId: string, checkedValue: boolean) => {
        changeTaskStatus(tId, checkedValue)
    }

    const onClickHandler = () => removeTask(task.id)
    /*
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
    }
    */
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }

    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <SuperCheckBox isDone={task.isDone}
                           callBack={(checkedValue) => changeStatusHandler(task.id, checkedValue)}/>
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});
