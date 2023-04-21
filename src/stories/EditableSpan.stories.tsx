import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {EditableSpan} from '../EditableSpan';


export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            action: 'clicked'
        }
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value: 'Hello'
};
