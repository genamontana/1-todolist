import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from '../Task';

export default {
    title: 'TODOLIST/Task',
    component: Task,
    argTypes: {
        changeTaskStatus: {
            action: 'clicked'
        },
        changeTaskTitle: {
            action: 'clicked'
        },
        removeTask: {
            action: 'clicked'
        },
    },
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    task: {id: '1', title: 'JS', isDone: false},
};

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {

    task: {id: '1', title: 'JS', isDone: true},
};
