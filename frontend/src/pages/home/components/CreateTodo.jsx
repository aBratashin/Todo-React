import React from 'react'
import axios from 'axios'
import { useAuth } from '../../../hook/useAuth.js'
import { useForm } from 'react-hook-form'

const CreateTodo = ({ handleUpdate, isEditable, todoData, setIsEditable, categoryOptions }) => {
	const { user } = useAuth()

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		mode: 'onChange'
	})

	const createTodo = (data) => {
		axios.post('http://localhost:3001/add_todo', { ...data, author: user })
			.then(res => {
				if (res.data.Status === 'Success') {
					handleUpdate()
					reset()
				} else {
					alert(res.data.Error)
				}
			})
	}

	const updateTodo = (data) => {
		axios.post('http://localhost:3001/update_todo', {
			...data,
			author: user,
			id: JSON.parse(localStorage.getItem('isEdit'))?.id || todoData.id
		})
			.then(res => {
				if (res.data.Status === 'Success') {
					setIsEditable(prev => !prev)
					localStorage.setItem('isEdit', JSON.stringify({ isEdit: !isEditable }))
					handleUpdate()
					reset()
				} else {
					alert(res.data.Error)
				}
			})

		axios.post('http://localhost:3001/update_completed_todo', {
			...data,
			author: user,
			id: JSON.parse(localStorage.getItem('isEdit'))?.id || todoData.id
		})
			.then(res => {
				if (res.data.Status === 'Success') {
					setIsEditable(prev => !prev)
					localStorage.setItem('isEdit', JSON.stringify({ isEdit: !isEditable }))
					handleUpdate()
					reset()
				} else {
					alert(res.data.Error)
				}
			})
	}

	return (
		<form
			onSubmit={handleSubmit(isEditable ? updateTodo : createTodo)}
			className="bg-gray-800 border-2 rounded-2xl py-4 px-8 text-white flex flex-col items-center justify-center min-w-xl max-w-2xl overflow-auto lg:w-1/2">
			<h2
				className="font-semibold text-3xl lg:text-4xl py-8 text-center">{isEditable ? 'Редактировать задачу' : 'Добавить задачу'}</h2>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="name" className="block mb-2 font-semibold cursor-pointer">Название: </label>
				<input
					{...register('name', {
						required: 'Поле обязательно для заполнения!'
					})}
					id="name"
					type="text"
					placeholder={isEditable ? 'Редактируйте название задачи' : 'Добавьте название задачи'}
					className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2" />
				<div
					className="text-red-400 max-w-2xl min-h-6 flex items-center justify-center text-center">
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
					placeholder={isEditable ? 'Редактируйте описание задачи' : 'Добавьте описание задачи'}
					className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2 min-h-80 resize-none" />
				<div
					className="text-red-400 max-w-2xl min-h-6 flex items-center justify-center text-center">
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
					<option defaultValue value="">{isEditable ? 'Измените категорию' : 'Выберите категорию'}</option>
					{categoryOptions.map(option => <option key={option.id} value={option.value}>{option.value}</option>)}
				</select>
				<div
					className="text-red-400 max-w-2xl min-h-6 flex items-center justify-center text-center">
					{errors?.category?.message}
				</div>
			</div>
			<button
				className="border w-full rounded-lg block p-2.5 bg-blue-600 border-gray-600 placeholder-gray-400 font-semibold focus:ring-blue-500 focus:border-blue-500 mb-2">{isEditable ? 'Редактировать' : 'Добавить'}</button>
		</form>
	)
}

export default CreateTodo