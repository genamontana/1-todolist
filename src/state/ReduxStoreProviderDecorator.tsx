import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from './store';
import {v1} from 'uuid';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from './todolists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todoListId1', title: 'What to learn', filter: 'all'},
        {id: 'todoListId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todoListId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todoListId2']: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};
