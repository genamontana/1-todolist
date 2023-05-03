import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todoListAPI = {
    updateTodoList(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: GetTodoListType }>>('todo-lists', {title})
    },
    getTodolists() {
        return instance.get<GetTodoListType[]>('todo-lists')
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    }
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}


type GetTodoListType = {
    id: string
    title: string
    addedDate: Date
    order: number
}
