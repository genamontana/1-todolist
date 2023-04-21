import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from '../AddItemForm';
import Button from '@mui/material/Button';


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {};





const TemplateError: ComponentStory<typeof AddItemForm> = (args) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>('Title is required')

    const addItem = () => {
        if (title.trim() !== '') {
            args.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <div>
        <input value={title}
               onChange={onChange}
               onKeyDown={onKeyPressHandler}
               className={error ? 'error' : ''}
        />
        <Button
            style={{
                maxWidth: '30px',
                maxHeight: '30px',
                minWidth: '30px',
                minHeight: '30px'
            }}
            variant="contained"
            onClick={addItem}>+
        </Button>

        {error && <div className="error-message">{error}</div>}
    </div>
};

export const AddItemFormWithErrorStory = TemplateError.bind({});
AddItemFormWithErrorStory.args = {};

