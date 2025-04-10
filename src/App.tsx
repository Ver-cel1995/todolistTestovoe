import Todolist from "./ui/todolist/Todolist";
import {useEffect, useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string,
    title: string,
    completed: boolean
}

export type FilterValue = 'all' | 'completed' | 'active'

function App() {

useEffect(() => {
    alert('Привет!)) Не забудь установить зависимости(uuid). Задание простое, поэтому полностью нативка, решил не нагружать библиотеками. ' +
        'Примерно 2 часа ушло на задачу. Если тебя всё устроило и нужны тесты напиши мне в телеграмме или позвони: 8961-593-88-84 (давай сразу на "ты"). ' +
        'Если хочешь, то могу сделать на Redux, там и функционал(интерактивность) добавлю - не люблю загромождать код :) Очень многое интересного можно сделать за полдня')
}, [])


    const [tasks, setTask] = useState<Task[]>([
        { id: v1(), title: 'Тестовое задание', completed: false },
        { id: v1(), title: 'Прекрасный код', completed: true },
        { id: v1(), title: 'Покрытие тестами', completed: false },
    ]);

    const [filter, setFilter] = useState<FilterValue>('all');

    let fileredTasks = tasks

    if (filter === 'active') {
        fileredTasks = tasks.filter((t) => !t.completed)
    } if (filter === 'completed') {
        fileredTasks = tasks.filter((t) => t.completed)
    }

    const filterTask = (filterTasks: FilterValue) => {
        setFilter(filterTasks)
    }

    const changeTask = (id: string, completed: boolean) => {
        setTask(tasks.map(el => el.id === id ? {...el, completed} : el))
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            completed: false,
        }

        setTask([newTask, ...tasks])
    }

    const clearTasks = () => {
        setTask(tasks.filter((t) => !t.completed))
    }

  return (
      <Todolist title='todos' tasks={fileredTasks} filterTask={filterTask} filter={filter} changeTask={changeTask} addTask={addTask} clearTasks={clearTasks}/>
  );
}

export default App;
