import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import '../../App.css';
import {FilterValue, Task} from "../../App";
import {Button} from "../../components/Button/Button";

type Props = {
    title: string
    tasks: Task[];
    filterTask: (filter: FilterValue) => void;
    changeTask: (id: string, completed: boolean) => void;
    addTask: (title: string) => void;
    clearTasks: () => void;
    filter: FilterValue
}

const Todolist = ({title, tasks, filterTask, changeTask, addTask, clearTasks, filter}: Props) => {
    const [value, setValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(value)
            setValue('')
        }
    }


    return (
        <div className="todo-app">
            <h1 className="header">{title}</h1>

            <div className="input">
                <div
                    className={`arrow ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ▼
                </div>
                <input
                    type="text"
                    placeholder={!isOpen ? 'Сначало ткрой задачи' : "What needs to be done?"}
                    value={value}
                    onChange={changeValue}
                    onKeyDown={createTaskOnEnterHandler}
                    disabled={!isOpen}
                />
            </div>

            {tasks.length === 0
                ? <span>тасок нету</span>
                : isOpen && (
                <ul className="todo-list">
                    {tasks.map(task => {
                        const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTask(task.id, e.currentTarget.checked)
                        }
                        return (
                            <li
                                key={task.id}
                                className={`todo-item ${task.completed ? 'completed' : ''}`}
                            >
                                <input type="checkbox" onChange={changeTaskHandler} checked={task.completed} readOnly/>
                                <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>
            )
            }

            <div className="footer">
                <span>{tasks.filter(t => !t.completed).length} items left</span>
                <div className="filters">
                    <Button title='all' onclick={() => filterTask('all')} className={filter === 'all' ? 'active' : 'noActive' } disabled={!isOpen}/>
                    <Button title='active' onclick={() => filterTask('active')} className={filter === 'active' ? 'active' : 'noActive' } disabled={!isOpen}/>
                    <Button title='completed' onclick={() => filterTask('completed')} className={filter === 'completed' ? 'active' : 'noActive' } disabled={!isOpen}/>
                </div>
                <Button title='Clear completed' onclick={clearTasks} className="clear-completed"/>
            </div>
        </div>
    )
}

export default Todolist