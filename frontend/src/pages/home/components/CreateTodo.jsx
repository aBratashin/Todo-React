import React from 'react'
import axios from 'axios'
import { useAuth } from '../../../hook/useAuth.js'
import { useForm } from 'react-hook-form'

const CreateTodo = ({ handleUpdate }) => {
	const { user } = useAuth()

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		mode: 'onChange'
	})

	const createTodo = (data) => {
		axios.post('http://localhost:3001/add_todo', { ...data, author: user })
			.then(res => {
				if (res.data.Status === 'Success') {
					console.log(errors)
					handleUpdate()
					reset()
				} else {
					alert(res.data.Error)
				}
			})
	}

	return (
		<form
			onSubmit={handleSubmit(createTodo)}
			className="bg-gray-800 border-2 rounded-2xl py-4 px-8 text-white flex flex-col items-center justify-center min-w-xl max-w-2xl lg:w-1/2">
			<h2 className="font-semibold text-3xl lg:text-4xl py-8 text-center">Добавить задачу</h2>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="name" className="block mb-2 font-semibold cursor-pointer">Название: </label>
				<input
					{...register('name', {
						required: 'Поле обязательно для заполнения!'
					})}
					id="name"
					type="text"
					placeholder="Добавьте задачу"
					className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2" />
				<div
					className="text-red-400 max-w-2xl min-h-8 flex items-center justify-center text-center">
					{errors?.name?.message}
				</div>
			</div>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="description" className="block mb-2 font-semibold cursor-pointer">Описание: </label>
				<textarea
					{...register('description', {
						required: 'Поле обязательно для заполнения!'
					})}
					id="description"
					placeholder="Добавьте описание задачи"
					className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2 min-h-80 resize-none" />
				<div
					className="text-red-400 max-w-2xl min-h-8 flex items-center justify-center text-center">
					{errors?.description?.message}
				</div>
			</div>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="category" className="block mb-2 font-semibold cursor-pointer">Категория: </label>
				<select id="category"
								{...register('category', {
									required: 'Поле обязательно для заполнения!'
								})}
								className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2">
					<option defaultValue value=''>Выберите категорию</option>
					<option value="Sport">Спорт</option>
					<option value="Health">Здоровье</option>
					<option value="Food">Еда</option>
					<option value="Travel">Путешествия</option>
				</select>
				<div
					className="text-red-400 max-w-2xl min-h-8 flex items-center justify-center text-center">
					{errors?.category?.message}
				</div>
			</div>
			<button
				className="border w-full rounded-lg block p-2.5 bg-blue-600 border-gray-600 placeholder-gray-400 font-semibold focus:ring-blue-500 focus:border-blue-500 mb-2">Добавить
			</button>
		</form>
	)
}

export default CreateTodo