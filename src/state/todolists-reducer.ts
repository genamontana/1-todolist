import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export const todoListsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            let newTodoList: TodolistType = {
                id: action.todolistId,
                title: action.newTodolistTitle,
                filter: 'all'
            }
            return [...state, newTodoList]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId2
                ? {...tl, title: action.payload.newTodolistTitle}
                : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId2
                ? {...tl, filter: action.payload.newFilter}
                : tl)
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}


type ActionType =
    removeTodoListACType
    | addTodoListACType
    | changeTodoListTitleACType
    | changeTodoListFilterACType


export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
            todolistId
    } as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        newTodolistTitle,
        todolistId: v1()
    } as const
}

type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId2,
            newTodolistTitle
        }
    } as const
}

type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todolistId2: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2,
            newFilter
        }
    } as const
}
