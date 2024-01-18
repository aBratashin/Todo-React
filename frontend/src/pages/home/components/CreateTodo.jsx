import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../../hook/useAuth.js'

const CreateTodo = () => {

	const clearData = {
		name: '',
		description: '',
		category: ''
	}

	const [todoData, setTodoData] = useState(clearData)

	const { user } = useAuth()

	const createTodoHandle = (e) => {
		e.preventDefault()

		axios.post('http://localhost:3001/add_todo', { ...todoData, author: user })
			.then(res => {
				if (res.data.Status === 'Success') {
					setTodoData(clearData)
				} else {
					alert(res.data.Error)
				}
			})
	}

	return (
		<div
			className="bg-gray-800 border-2 rounded-2xl py-4 px-8 text-white flex flex-col items-center justify-center min-w-xl max-w-2xl lg:w-1/2">
			<h2 className="font-semibold text-3xl lg:text-4xl py-8 text-center">Добавить задачу</h2>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="name" className="block mb-2 font-semibold cursor-pointer">Название: </label>
				<input
					id="name"
					type="text"
					placeholder="Добавьте задачу"
					value={todoData.name}
					onChange={e => setTodoData({ ...todoData, name: e.target.value })}
					className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2" />
			</div>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="description" className="block mb-2 font-semibold cursor-pointer">Описание: </label>
				<textarea
					id="description"
					placeholder="Добавьте описание задачи"
					value={todoData.description}
					onChange={e => setTodoData({ ...todoData, description: e.target.value })}
					className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2 min-h-80 resize-none" />
			</div>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="category" className="block mb-2 font-semibold cursor-pointer">Категория: </label>
				<select id="category"
								value={todoData.category}
								onChange={e => setTodoData({ ...todoData, category: e.target.value })}
								className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2">
					<option defaultValue>Выберите категорию</option>
					<option value="Sport">Спорт</option>
					<option value="Health">Здоровье</option>
					<option value="Food">Еда</option>
					<option value="Travel">Путешествия</option>
				</select>
			</div>
			<button
				onClick={createTodoHandle}
				className="border w-full rounded-lg block p-2.5 bg-blue-600 border-gray-600 placeholder-gray-400 font-semibold focus:ring-blue-500 focus:border-blue-500 mb-2">Добавить
			</button>
		</div>
	)
}

export default CreateTodo