import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from './todolists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store;